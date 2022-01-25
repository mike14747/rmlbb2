import { connectToDatabase } from '../../utils/mongodb';
// import { ObjectID } from 'mongodb';

const getForumList = async () => {
    const { db } = await connectToDatabase();

    return await db
        .collection('forums')
        .find({ active: true })
        .project({ _id: { '$toString': '$_id' }, name: 1, topics: 1, posts: 1, lastPost: 1 })
        .sort({ order: 1 })
        .toArray();
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
