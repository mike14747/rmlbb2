import { connectToDatabase } from '../../utils/mongodb';
import { mailTransporter } from '../helpers/nodemailerConfig';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import { formatDateObject } from '../helpers/formatDate';

const salt = bcryptjs.genSaltSync(10);

const isUsernameTaken = async (username) => {
    return true;
};

const getUserForSignin = async (username) => {
    const { db } = await connectToDatabase();

    return await db
        .collection('users')
        .findOne({ username: username }, { projection: { _id: 1, username: 1, password: 1, role: 1 } });
};

const getUserProfile = async (username) => {
    const { db } = await connectToDatabase();

    const data = await db
        .collection('users')
        .find({ username: username, active: true })
        .project({ username: 1, email: 1, posts: 1, registeredDate: 1 })
        .limit(1)
        .toArray();

    data[0].registeredDate = formatDateObject(data[0].registeredDate, 'short');

    return data;
};

const changeUsername = async (_id, newUsername) => {
    if (!_id) return { code: 401 };
    const pattern = /^(?=.{4,15}$)[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$/;
    if (!newUsername || !pattern.test(newUsername)) return { code: 400 };

    const { db } = await connectToDatabase();

    // make sure newUsername is not already in use
    const inUseResult = await db
        .collection('users')
        .find({ _id: _id, username: newUsername })
        .project({ _id: 1 })
        .limit(1)
        .toArray();
    if (!inUseResult) return { code: 500 };
    if (inUseResult.length === 1) return { code: 409 };

    // update the user's username (and all references to it in other colections) with newUsername using a tranaction
    const { client } = await connectToDatabase();
    const session = client.startSession();

    let transactionResult;

    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
    };

    try {
        transactionResult = await session.withTransaction(async () => {
            await db
                .collection('users')
                .updateOne({ _id: _id }, { $set: { username: newUsername } }, { session });

            await db
                .collection('topics')
                .updateMany({ user_id: _id }, { $set: { username: newUsername } }, { session });

            await db
                .collection('replies')
                .updateMany({ user_id: _id }, { $set: { username: newUsername } }, { session });

            await db
                .collection('forums')
                .updateMany({ 'lastPost.userId': _id }, { $set: { 'lastPost.username': newUsername } }, { session });

            await db
                .collection('topics')
                .updateMany({ 'lastReply.userId': _id }, { $set: { 'lastReply.username': newUsername } }, { session });
        }, transactionOptions);
    } catch (error) {
        console.error(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
};

const changeEmail = async (_id, newEmail) => {
    if (!_id) return { code: 401 };
    const pattern = /^(?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!newEmail || !pattern.test(newEmail)) return { code: 400 };

    const { db } = await connectToDatabase();
    const updateResult = await db
        .collection('users')
        .updateOne({ _id: _id }, { $set: { email: newEmail } });

    return updateResult?.modifiedCount === 1 ? { code: 200 } : { code: 500 };
};

const changePassword = async (_id, newPassword, token = null) => {
    if (!_id) return { code: 401 };
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$/;
    if (!newPassword || !pattern.test(newPassword)) return { code: 400 };
    const hashedPassword = bcryptjs.hashSync(newPassword, salt);

    const { db } = await connectToDatabase();

    if (token) {
        // since a token is present, check to see if is valid (both in value and in expiration)
        const tokenValidCheck = await db
            .collection('users')
            .find({ _id: _id, resetPasswordToken: token })
            .project({ resetPasswordEXpires: 1 })
            .limit(1)
            .toArray();
        if (tokenValidCheck?.length !== 1) return { code: 408 };
    }

    const updateResult = await db
        .collection('users')
        .updateOne({ _id: _id }, { $set: { password: hashedPassword } });

    return updateResult?.modifiedCount === 1 ? { code: 200 } : { code: 500 };
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
            html: '<p>A request for your rmlbb username(s) has been made for this email address.</p><p>The rmlbb username(s) associated with this email address is/are:<br /><br />' + user.map(u => u.username).join('<br />') + '</p>',
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
        const link = `${process.env.BASE_URL}/reset-link/${user[0]._id}/${token}`;

        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: '<p>A password reset request for your rmlbb username <strong>"' + username + '"</strong> has been made for this email address.</p><p>Click this <a href="' + link + '">link</a> to reset your password. The link will expire in 1 hour.</p><p>If you did not request a password reset, ignore this email.</p>',
        };

        // add the reset token and expiration date to the user in the db
        const updateResult = await db
            .collection('users')
            .updateOne({ _id: _id }, { $set: { resetPasswordToken: token, resetPasswordEXpires: new Date(Date.now() + 36000) } });

        if (updateResult?.modifiedCount !== 1) return { code: 500 };

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
