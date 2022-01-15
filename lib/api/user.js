import { connectToDatabase } from '../../utils/mongodb';
const ObjectID = require('mongodb').ObjectID;
import { mailTransporter } from '../helpers/nodemailerConfig';

const getUserForSignin = async (username) => {
    const { db } = await connectToDatabase();

    return db
        .collection('users')
        .find({ username: username })
        .project({ email: 0 })
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

const changeUsername = async (_id, newUsername) => {
    const { db } = await connectToDatabase();

    if (!_id) return { code: 401 };
    if (!newUsername) return { code: 400 };

    // make sure newUsername is not already in use by another user
    const result = await db
        .collection('users')
        .find({ _id: { $ne: ObjectID(_id) }, username: newUsername })
        .project({ _id: 0, password: 0, email: 0 })
        .limit(1)
        .toArray();
    if (!result) return { code: 500 };
    if (result.length === 1) return { code: 409 };

    // at this point, it must be ok to update the username
    // update the user's username with newUsername
    return { code: 200 };

    // return possiblilities:
    // 200 successfully updated the user's username
    // 400 no newUsername was provided
    // 401 no _id was provided
    // 409 newUsername is already in use
    // 500 server error trying to make the update
};

const forgottenUsername = async (email) => {
    const { db } = await connectToDatabase();

    const user = await db
        .collection('users')
        .find({ email })
        .project({ _id: 0, password: 0, email: 0 })
        .toArray();

    if (user?.length > 0) {
        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Forgot Username',
            html: '<p>A request for your rmlbb username(s) has been made for this email address.</p><p>The rmlbb username(s) associated with this email address is/are: "' + user.map(u => u.username).join(', ') + '".</p>',
        };

        try {
            const emailSent = await mailTransporter.sendMail(mailDetails);
            return emailSent ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        // if it is not a valid email address, what should be done?
        console.log('the submitted email address does NOT match a registered user');
        return false;
    }
};

const resetPassword = async (username, email) => {
    const { db } = await connectToDatabase();

    const user = await db
        .collection('users')
        .find({ username, email })
        .project({ _id: 0, password: 0, email: 0 })
        .limit(1)
        .toArray();

    if (user?.length === 1) {
        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: '<p>A password reset request for your rmlbb username "' + username + '" has been made for this email address.</p><p>Click this <a href="_blank">link</a> to reset your password.</p>',
        };

        try {
            const emailSent = await mailTransporter.sendMail(mailDetails);
            return emailSent ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        // if it is not a valid email address, what should be done?
        console.log('the submitted email address does NOT match a registered user');
        return false;
    }
};

module.exports = {
    getUserForSignin,
    getUserProfile,
    changeUsername,
    forgottenUsername,
    resetPassword,
};
