import { connectToDatabase } from '../../utils/mongodb';

const getUserForSignin = async (username) => {
    const { db } = await connectToDatabase();

    return db
        .collection('users')
        .find({ username: username })
        .limit(1)
        .toArray();
};

module.exports = {
    getUserForSignin,
};
