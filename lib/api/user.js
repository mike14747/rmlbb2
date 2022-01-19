import { connectToDatabase } from '../../utils/mongodb';
import { ObjectID } from 'mongodb';
import { mailTransporter } from '../helpers/nodemailerConfig';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

const salt = bcryptjs.genSaltSync(10);

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
    if (!_id) return { code: 401 };
    const pattern = /^[a-zA-Z0-9_-]{6,15}$/;
    if (!newUsername || !pattern.test(newUsername)) return { code: 400 };

    const { db } = await connectToDatabase();

    // make sure newUsername is not already in use by another user
    const inUseResult = await db
        .collection('users')
        .find({ _id: { $ne: ObjectID(_id) }, username: newUsername })
        .project({ _id: 0, password: 0, email: 0 })
        .limit(1)
        .toArray();
    if (!inUseResult) return { code: 500 };
    if (inUseResult.length === 1) return { code: 409 };

    // update the user's username with newUsername
    const updateResult = await db
        .collection('users')
        .updateOne({ _id: ObjectID(_id) }, { $set: { username: newUsername } });
    return updateResult?.result?.ok === 1 ? { code: 200 } : { code: 500 };
};

const changeEmail = async (_id, newEmail) => {
    if (!_id) return { code: 401 };
    const pattern = /^(?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!newEmail || !pattern.test(newEmail)) return { code: 400 };

    const { db } = await connectToDatabase();
    const updateResult = await db
        .collection('users')
        .updateOne({ _id: ObjectID(_id) }, { $set: { email: newEmail } });
    return updateResult?.result?.ok === 1 ? { code: 200 } : { code: 500 };
};

const changePassword = async (_id, newPassword) => {
    if (!_id) return { code: 401 };
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$/;
    if (!newPassword || !pattern.test(newPassword)) return { code: 400 };
    const hashedPassword = bcryptjs.hashSync(newPassword, salt);

    const { db } = await connectToDatabase();
    const updateResult = await db
        .collection('users')
        .updateOne({ _id: ObjectID(_id) }, { $set: { password: hashedPassword } });
    return updateResult?.result?.ok === 1 ? { code: 200 } : { code: 500 };
};

const forgottenUsername = async (email) => {
    if (!email) return { code: 400 };

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
            return emailSent ? { code: 200 } : { code: 500 };
        } catch (error) {
            console.error(error);
            return { code: 500 };
        }
    } else {
        // email address doesn't match any in the database
        return { code: 400 };
    }
};

const resetPassword = async (username, email) => {
    if (!username || !email) return { code: 400 };

    const { db } = await connectToDatabase();
    const user = await db
        .collection('users')
        .find({ username, email })
        .project({ _id: 1 })
        .limit(1)
        .toArray();

    if (user?.length === 1) {
        const _id = user[0]._id;
        // generate a reset token
        const token = crypto.randomBytes(20).toString('hex');
        const link = `${process.env.BASE_URL}/reset-link/${user._id}/${token.token}`;

        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: '<p>A password reset request for your rmlbb username "' + username + '" has been made for this email address.</p><p>Click this <a href="_blank">link</a> to reset your password. The link will expire in 1 hour.</p><p>If you did not request a password reset, ignore this email.</p>',
        };

        // add the reset token and expiration date to the user in the db
        const updateResult = await db
            .collection('users')
            .updateOne({ _id: ObjectID(_id) }, { $set: { resetPasswordToken: token, resetPasswordEXpires: Date.now() + 36000 } });

        if (updateResult?.result?.ok !== 1) return { code: 500 };

        try {
            const emailSent = await mailTransporter.sendMail(mailDetails);
            return emailSent ? { code: 200 } : { code: 500 };
        } catch (error) {
            console.error(error);
            return { code: 500 };
        }
    } else {
        // username and email address doesn't match any user in the database
        return { code: 400 };
    }
};

module.exports = {
    getUserForSignin,
    getUserProfile,
    changeUsername,
    changeEmail,
    changePassword,
    forgottenUsername,
    resetPassword,
};
