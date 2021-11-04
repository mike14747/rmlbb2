import { connectToDatabase } from '../../utils/mongodb';

const getUserForSignin = async (username) => {
    const { db } = await connectToDatabase();

    return db
        .collection('users')
        .find({ username: username })
        .project({ _id: 0, email: 0 })
        .limit(1)
        .toArray();
};

const getUserProfile = async (username) => {
    const { db } = await connectToDatabase();

    return db
        .collection('users')
        .find({ username: username })
        .project({ _id: 0, password: 0 })
        .limit(1)
        .toArray();
};

const updateUserProfile = async (username, password, email) => {
    const { db } = await connectToDatabase();
    return 'Success!';
};

module.exports = {
    getUserForSignin,
    getUserProfile,
    updateUserProfile,
};
