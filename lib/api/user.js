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
    if (username) {
        console.log('username was updated');
    } else if (password) {
        console.log('password was updated');
    } else if (email) {
        console.log('email was updated');
    } else {
        return null;
    }
    return 'Success!';
};

module.exports = {
    getUserForSignin,
    getUserProfile,
    updateUserProfile,
};
