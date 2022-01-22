import { connectToDatabase } from '../../utils/mongodb';
// import { ObjectID } from 'mongodb';

const getForumList = async () => {
    const { db } = await connectToDatabase();

    return await db
        .collection('forums')
        .find({ active: true })
        .project({ _id: { '$toString': '$_id' }, name: 1 })
        .toArray();
};

module.exports = {
    getForumList,
};
