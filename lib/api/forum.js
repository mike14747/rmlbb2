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
        .collection('topics')
        .find({ active: true, forum_id: parseInt(forumId) })
        .project({ _id: 1, title: 1, content: 1, user_id: 1, date: 1, views: 1, lastPost: 1 })
        .sort({ _id: -1 })
        .toArray();

    data.forEach(forum => {
        forum.date = formatDateObjectWithTime(forum.date, 'short');
        if (forum.lastPost) forum.lastPost.date = formatDateObjectWithTime(forum.lastPost.date, 'short');
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

module.exports = {
    getForumList,
    getForumTopics,
    getForumTopic,
    getForumName,
    addTopic,
};
