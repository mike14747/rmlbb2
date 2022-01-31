import { connectToDatabase } from '../../utils/mongodb';

import { formatDateObjectWithTime } from '../helpers/formatDate';

const getForumList = async () => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('forums')
        .find({ active: true })
        .project({ _id: { '$toString': '$_id' }, name: 1, topics: 1, posts: 1, lastPost: 1 })
        .sort({ order: 1 })
        .toArray();

    data.forEach(forum => {
        return forum.lastPost.date = formatDateObjectWithTime(forum.lastPost.date, 'short');
    });
    return data;
};

const getForumTopics = async () => {
    // const { db } = await connectToDatabase();

    return [];
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
