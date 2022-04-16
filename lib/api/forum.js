import { connectToDatabase } from '../../utils/mongodb';

import { formatDateObjectWithTime } from '../helpers/formatDate';
import { getNextId } from '../helpers/getNextMongoId';

const getForumList = async () => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('forums')
        .find({ active: true })
        .project({ _id: 1, name: 1, topics: 1, posts: 1, lastPost: 1 })
        .sort({ order: 1 })
        .toArray();

    data.forEach(forum => {
        forum.lastPostDaysAgo = Math.floor((new Date() - forum.lastPost.date) / (1000 * 60 * 60 * 24));
        forum.lastPost.date = formatDateObjectWithTime(forum.lastPost.date, 'short');
    });
    return data;
};

const getForumListForEdit = async () => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('forums')
        .find()
        .project({ _id: 1, name: 1, active: 1, order: 1 })
        .sort({ order: 1 })
        .toArray();

    return data;
};

const getForumTopics = async (forumId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('topics').aggregate([
            {
                $match: {
                    active: true,
                    forumActive: true,
                    forum_id: forumId,
                },
            },
            {
                $addFields: {
                    lastDate: {
                        $cond: {
                            if: { $gt: ['$lastReply.date', null] },
                            then: '$lastReply.date',
                            else: '$date',
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    user_id: 1,
                    username: 1,
                    date: 1,
                    views: 1,
                    lastReply: 1,
                    forumName: 1,
                    replies: 1,
                    lastDate: 1,
                },
            },
            {
                $sort: {
                    lastDate: -1,
                },
            },
        ])
        .toArray();

    data.forEach(topic => {
        topic.date = formatDateObjectWithTime(topic.date, 'short');
        if (topic.lastReply) topic.lastReply.date = formatDateObjectWithTime(topic.lastReply.date, 'short');
    });
    return data;
};

const getMostRecentPostsForHomepage = async () => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('topics').aggregate([
            {
                '$match': {
                    'active': true,
                    'forumActive': true,
                },
            },
            {
                '$project': {
                    'title': 1,
                    'content': 1,
                    'forumName': 1,
                    'username': 1,
                    'date': 1,
                },
            },
            {
                '$sort': {
                    'date': -1,
                },
            },
            {
                '$limit': 5,
            },
            {
                '$unionWith': {
                    'coll': 'replies',
                    'pipeline': [
                        {
                            '$match': {
                                'topicActive': true,
                                'forumActive': true,
                            },
                        }, {
                            '$project': {
                                'title': '$subject',
                                'content': 1,
                                'forumName': 1,
                                'username': 1,
                                'date': 1,
                            },
                        }, {
                            '$sort': {
                                'date': -1,
                            },
                        }, {
                            '$limit': 5,
                        },
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
            {
                '$sort': {
                    'date': -1,
                },
            },
            {
                '$limit': 5,
            },
        ])
        .map(topic => {
            topic.content = topic.content.replace(/(<([^>]+)>)/ig, '').substring(0, 60);
            topic.date = formatDateObjectWithTime(topic.date, 'short');
            return topic;
        })
        .toArray();

    return data;
};

const getForumTopic = async (forumId, topicId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('topics')
        .findOne({ forum_id: forumId, _id: topicId, forumActive: true, active: true });

    if (data?.date) data.date = formatDateObjectWithTime(data.date, 'short');

    return data;
};

const getTopicReplies = async (repliesArr) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('replies')
        .find({ _id: { $in: repliesArr } })
        .toArray();

    data.forEach(reply => {
        reply.date = formatDateObjectWithTime(reply.date, 'short');
        if (reply.lastEditDate) reply.lastEditDate = formatDateObjectWithTime(reply.lastEditDate, 'short');
    });
    return data;
};

const getForumName = async (forumId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('forums')
        .findOne({ active: true, _id: forumId }, { projection: { _id: 0, name: 1 } });

    return data;
};

const addForum = async (name, active = true) => {
    if (!name) return { code: 400 };

    const { db } = await connectToDatabase();

    const inUseResult = await db
        .collection('forums')
        .findOne({ name: name }, { projection: { _id: 0, name: 1 } });
    if (inUseResult) return { code: 409 };

    // at this point, the new forum name is not already in use, so get the next _id from the counters collection
    const nextId = await getNextId('forum_id');
    if (!nextId) return { code: 500 };

    const newForum = {
        _id: nextId,
        name,
        active,
        order: 20,
        topics: 0,
        posts: 0,
        lastPost: {},
    };

    const result = await db
        .collection('forums')
        .insertOne(newForum);

    return result?.insertedId ? { code: 201 } : { code: 500 };
};

const editForumActiveStatus = async (_id, bool) => {
    const { db } = await connectToDatabase();

    // update the forum name (and all references to it in other colections) with newForumName using a tranaction
    const { client } = await connectToDatabase();
    const session = client.startSession();

    let transactionResult;

    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('forums')
                .updateOne({ _id: _id }, { $set: { active: bool } }, { session });

            await db
                .collection('topics')
                .updateMany({ forum_id: _id }, { $set: { forumActive: bool } }, { session });

            await db
                .collection('replies')
                .updateMany({ forum_id: _id }, { $set: { forumActive: bool } }, { session });
        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
};

const editForumName = async (_id, newForumName) => {
    const { db } = await connectToDatabase();

    // make sure newForumName is not already in use
    const inUseResult = await db
        .collection('forums')
        .find({ _id: _id, name: newForumName })
        .project({ _id: 1 })
        .limit(1)
        .toArray();
    if (!inUseResult) return { code: 500 };
    if (inUseResult.length === 1) return { code: 409 };

    // update the forum name (and all references to it in other colections) with newForumName using a tranaction
    const { client } = await connectToDatabase();
    const session = client.startSession();

    let transactionResult;

    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('forums')
                .updateOne({ _id: _id }, { $set: { name: newForumName } }, { session });

            await db
                .collection('topics')
                .updateMany({ forum_id: _id }, { $set: { forumName: newForumName } }, { session });

            await db
                .collection('replies')
                .updateMany({ forum_id: _id }, { $set: { forumName: newForumName } }, { session });
        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
};

const addTopic = async (userId, username, forumId, forumName, title, content) => {
    if (!userId || !username || !forumId || !forumName || !title || !content) return { code: 400 };

    const { db } = await connectToDatabase();

    // get the next _id from the counters collection
    const nextId = await getNextId('topic_id');
    if (!nextId) return { code: 500 };

    const currentDate = new Date();

    const newTopic = {
        _id: nextId,
        title,
        content,
        forum_id: forumId,
        forumName,
        user_id: userId,
        username,
        date: currentDate,
        lastEditDate: null,
        views: 0,
        replies: [],
        forumActive: true,
        active: true,
        lastReply: {},
    };

    const lastPost = {
        topicId: nextId,
        replyId: null,
        subject: title,
        userId,
        username,
        date: currentDate,
    };

    // add a new topic and update the forum's lastTopic object to include it using a tranaction
    const { client } = await connectToDatabase();
    const session = client.startSession();

    let transactionResult;

    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('topics')
                .insertOne(newTopic, { session });

            await db
                .collection('forums')
                .updateOne({ _id: forumId }, { $set: { lastPost: lastPost } }, { session });

        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 201 } : { code: 500 };
};

const editTopic = async () => {
    // const { db } = await connectToDatabase();

    return { code: 200 };
};

const getOneReply = async (replyId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('replies')
        .findOne({ _id: replyId }, { projection: { subject: 1, content: 1 } });

    return data;
};

module.exports = {
    getForumList,
    getForumListForEdit,
    getForumTopics,
    getMostRecentPostsForHomepage,
    getForumTopic,
    getTopicReplies,
    getForumName,
    addForum,
    editForumActiveStatus,
    editForumName,
    addTopic,
    editTopic,
    getOneReply,
};
