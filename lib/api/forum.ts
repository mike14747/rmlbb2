import { connectToDatabase } from '../../utils/mongodb';
import { formatDateObjectWithTime } from '../helpers/formatDate';
import { getNextId } from '../helpers/getNextMongoId';
import { ForumList, ForumTopics, RecentPost, TopicReplyData } from '@/types/forum-types';

export async function getForumList() {
    const { db } = await connectToDatabase();

    const data: ForumList[] = await db
        .collection('forums')
        .find({ active: true })
        .project({ _id: 1, name: 1, topics: 1, posts: 1, lastPost: 1 })
        .sort({ order: 1 })
        .toArray();

    data.forEach(forum => {
        forum.lastPostDaysAgo = forum.lastPost.date ? Math.floor((+new Date() - +forum.lastPost.date) / (1000 * 60 * 60 * 24)) : undefined;
        forum.lastPost.dateStr = forum.lastPost.date ? formatDateObjectWithTime(forum.lastPost.date, 'short') : undefined;
    });
    return data;
}

export async function getForumListForEdit() {
    const { db } = await connectToDatabase();

    const data: { _id: number; name: string; active: boolean; order: number; }[] = await db
        .collection('forums')
        .find()
        .project({ _id: 1, name: 1, active: 1, order: 1 })
        .sort({ order: 1 })
        .toArray();

    return data;
}

export async function getForumTopics(forumId: number) {
    const { db } = await connectToDatabase();

    const data: ForumTopics[] = await db
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
        topic.dateStr = formatDateObjectWithTime(topic.date, 'short');
        if (topic.lastReply) topic.lastReply.dateStr = formatDateObjectWithTime(topic.lastReply.date, 'short');
    });
    return data;
}

export async function getMostRecentPostsForHomepage() {
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
        .map((topic: RecentPost) => {
            topic.content = topic.content.replace(/(<([^>]+)>)/ig, '').substring(0, 60);
            topic.dateStr = formatDateObjectWithTime(topic.date, 'short');
            return topic;
        })
        .toArray();

    return data;
}

export async function getForumTopic(forumId: number, topicId: number) {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('topics')
        .findOne({ forum_id: forumId, _id: topicId, forumActive: true, active: true });

    if (data?.date) data.date = formatDateObjectWithTime(data.date, 'short');

    return data;
}

export async function getTopicReplies(repliesArr: number[]) {
    const { db } = await connectToDatabase();

    const data: TopicReplyData[] = await db
        .collection('replies')
        .find({ _id: { $in: repliesArr } })
        .toArray();

    data.forEach(reply => {
        reply.dateStr = formatDateObjectWithTime(reply.date, 'short');
        reply.lastEditDateStr = reply.lastEditDate ? formatDateObjectWithTime(reply.lastEditDate, 'short') : undefined;
    });
    return data;
}

export async function getForumName(forumId: number) {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('forums')
        .findOne({ active: true, _id: forumId }, { projection: { _id: 0, name: 1 } });

    return data;
}

export async function addForum(name: string, active = true) {
    if (!name) return { code: 400 };

    const { db } = await connectToDatabase();

    const inUseResult = await db
        .collection('forums')
        .find({ name: name })
        .project({ _id: 0, name: 1 })
        .limit(1)
        .toArray();

    if (!inUseResult) return { code: 500 };
    if (inUseResult.length > 0) return { code: 409 };

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
}

export async function editForum(_id: number, newForumName: string, newActiveStatus: boolean) {
    const { db } = await connectToDatabase();

    // make sure newForumName is not already in use
    const inUseResult = await db
        .collection('forums')
        .find({ _id: { $ne: _id }, name: newForumName })
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
                .updateOne({ _id: _id }, { $set: { name: newForumName, active: newActiveStatus } }, { session });

            await db
                .collection('topics')
                .updateMany({ forum_id: _id }, { $set: { forumName: newForumName, forumActive: newActiveStatus } }, { session });

            await db
                .collection('replies')
                .updateMany({ forum_id: _id }, { $set: { forumName: newForumName, forumActive: newActiveStatus } }, { session });
        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
}

export async function addTopic(userId: number, username: string, forumId: number, forumName: string, title: string, content: string) {
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
}

export async function editTopic(topicId: number, userId: number, title: string, content: string) {
    if (!topicId || !userId || !title || !content) return { code: 400 };

    const { db } = await connectToDatabase();

    const currentDate = new Date();

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
                .updateOne({ _id: topicId, user_id: userId }, { $set: { title, content, lastEditDate: currentDate } }, { session });

            await db
                .collection('forums')
                .updateOne({ 'lastPost.topicId': topicId, 'lastPost.replyId': null, 'lastPost.userId': userId }, { $set: { lastPost: { subject: title, content } } }, { session });

        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
}

export async function getOneReply(replyId: number) {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('replies')
        .findOne({ _id: replyId }, { projection: { subject: 1, content: 1 } });

    return data;
}
