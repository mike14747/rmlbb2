import { connectToDatabase } from '../../utils/mongodb';
import { ObjectID } from 'mongodb';

const getForumList = async () => {
    const { db } = await connectToDatabase();

    return db
        .collection('forums')
        .find({ active: true })
        .project({ name: 1 })
        .toArray();
};

module.exports = {
    getForumList,
};
