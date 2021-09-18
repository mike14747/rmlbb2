import { connectToDatabase } from '../../utils/mongodb';

const getUserForSignin = async (username) => {
    const { db } = await connectToDatabase();

    return db
        .collection('users')
        .find({ username: username })
        .limit(1)
        .toArray();
};

const getUserProfile = async (username) => {
    const { db } = await connectToDatabase();

    return db
        .collection('users')
        .find({ username: username })
        .project({ password: 0 })
        .limit(1)
        .toArray();
};

module.exports = {
    getUserForSignin,
    getUserProfile,
};
