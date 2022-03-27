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

const addTopic = async (userId, username, forumId, title, content) => {
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
    getForumTopics,
    getMostRecentPostsForHomepage,
    getForumTopic,
    getTopicReplies,
    getForumName,
    addForum,
    addTopic,
    getOneReply,
};
