import { connectToDatabase } from '../../utils/mongodb';

import { formatDateObjectWithTime } from '../helpers/formatDate';

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
                    forum_id: parseInt(forumId),
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
        // console.log('topic:', topic);
        topic.date = formatDateObjectWithTime(topic.date, 'short');
        if (topic.lastReply) topic.lastReply.date = formatDateObjectWithTime(topic.lastReply.date, 'short');
    });
    return data;
};

const getForumTopic = async () => {
    // const { db } = await connectToDatabase();

    return [];
};

const getForumName = async (forumId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('forums')
        .findOne({ active: true, _id: parseInt(forumId) }, { projection: { _id: 0, name: 1 } });

    return data;
};

const addTopic = async (userId, username, forumId, title, content) => {
    // const { db } = await connectToDatabase();

    return { code: 200 };
};

const getOneReply = async (replyId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('replies')
        .findOne({ _id: parseInt(replyId) }, { projection: { subject: 1, content: 1 } });

    return data;
};

module.exports = {
    getForumList,
    getForumTopics,
    getForumTopic,
    getForumName,
    addTopic,
    getOneReply,
};
