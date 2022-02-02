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
        return forum.lastPost.date = formatDateObjectWithTime(forum.lastPost.date, 'short');
    });
    return data;
};

const getForumTopics = async (forumId) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('topics')
        .find({ active: true, forum_id: parseInt(forumId) })
        .project({ _id: 1, title: 1, content: 1, user_id: 1, date: 1, views: 1 })
        .sort({ _id: -1 })
        .toArray();

    data.forEach(forum => {
        return forum.date = formatDateObjectWithTime(forum.date, 'short');
    });
    return data;
};

const getForumTopic = async () => {
    // const { db } = await connectToDatabase();

    return [];
};

module.exports = {
    getForumList,
    getForumTopics,
    getForumTopic,
};
