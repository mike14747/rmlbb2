import { connectToDatabase } from '../../utils/mongodb';
import clientPromise from '../mongodb';
// import { ObjectId } from 'bson';
import { mailTransporter } from '../helpers/nodemailerConfig';
import { formatDateObject } from '../helpers/formatDate';
import { usernamePattern, emailPattern, passwordPattern } from '../formInputPatterns';
import { generateRandom, hashPassword } from '../helpers/cryptoUtils';
// import * as sft from '../../types/serverlessFunctionTypes';

export async function getUserForSignin(username: string, password: string) {
    // const salt = generateRandom(32);
    // console.log({ password: hashPassword(password, salt), salt });

    try {
        const connection = await clientPromise;
        const db = connection.db();

        const user = await db
            .collection('users')
            .findOne({ username: username, active: true }, { projection: { _id: 1, username: 1, password: 1, salt: 1, role: 1 } });

        if (!user) return null;

        const hashedPassword = hashPassword(password, user?.salt);
        if (!hashedPassword) return null;

        if (hashedPassword === user.password) {
            return {
                _id: user._id.toString(),
                username: user.username,
                role: user.role,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUserProfile(id: number) {
    try {
        const connection = await clientPromise;
        const db = connection.db();

        const user = await db
            .collection('users')
            .findOne<{ username: string, email: string, id: number, registeredDate: string | null }>({ _id: id, active: true }, { projection: { username: 1, email: 1, posts: 1, registeredDate: 1 } });

        if (!user) return null;

        user.registeredDate = formatDateObject(user.registeredDate, 'short');
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function changeUsername(id: number, newUsername: string) {
    if (!id) return { code: 401 };
    const pattern = new RegExp(usernamePattern);
    if (!newUsername || !pattern.test(newUsername)) return { code: 400 };

    const { db } = await connectToDatabase();

    // make sure newUsername is not already in use
    const inUseResult = await db
        .collection('users')
        .find({ _id: id, username: newUsername })
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
                .updateOne({ _id: id }, { $set: { username: newUsername } }, { session });

            await db
                .collection('topics')
                .updateMany({ user_id: id }, { $set: { username: newUsername } }, { session });

            await db
                .collection('replies')
                .updateMany({ user_id: id }, { $set: { username: newUsername } }, { session });

            await db
                .collection('forums')
                .updateMany({ 'lastPost.userId': id }, { $set: { 'lastPost.username': newUsername } }, { session });

            await db
                .collection('topics')
                .updateMany({ 'lastReply.userId': id }, { $set: { 'lastReply.username': newUsername } }, { session });
        }, transactionOptions);
    } catch (error) {
        console.log(error);
    } finally {
        await session.endSession();
    }

    return transactionResult?.ok === 1 ? { code: 200 } : { code: 500 };
}

export async function changeEmail(id: number, newEmail: string) {
    if (!id) return { code: 401 };
    const pattern = new RegExp(emailPattern);
    if (!newEmail || !pattern.test(newEmail)) return { code: 400 };

    const { db } = await connectToDatabase();
    const updateResult = await db
        .collection('users')
        .updateOne({ _id: id }, { $set: { email: newEmail } });

    return updateResult?.modifiedCount === 1 ? { code: 200 } : { code: 500 };
}

export async function changePassword(id: number, password: string, resetPasswordToken = null) {
    if (!id) return { code: 401 };
    const pattern = new RegExp(passwordPattern);
    if (!password || !pattern.test(password)) return { code: 400 };

    const { db } = await connectToDatabase();

    if (resetPasswordToken) {
        // since a token is being passed, get the expiration date/time of the token if it exists in the db
        const tokenValidCheck = await db
            .collection('users')
            .find({ _id: id, resetPasswordToken })
            .project({ resetPasswordExpires: 1 })
            .limit(1)
            .toArray();

        // make sure token is found and is not expired
        if (tokenValidCheck?.length !== 1) return { code: 406 };
        if (tokenValidCheck[0]?.resetPasswordExpires < new Date(Date.now())) return { code: 412 };
    }

    const salt = generateRandom(32);
    const hashedPassword = hashPassword(password, salt);

    const updateResult = await db
        .collection('users')
        .updateOne({ _id: id }, { $set: { password: hashedPassword, salt } });

    return updateResult?.modifiedCount === 1 ? { code: 200 } : { code: 500 };
}

export async function forgotUsername(email: string) {
    if (!email) return { code: 400 };

    const { db } = await connectToDatabase();
    const userData = await db
        .collection('users')
        .find({ email })
        .project({ username: 1 })
        .toArray();

    if (!userData) return { code: 500 };
    const usernames = userData as { username: string }[];

    if (usernames?.length > 0) {
        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Forgot Username',
            html: '<p>A request for your rmlbb username(s) has been made for this email address.</p><p>The rmlbb username(s) associated with this email address is/are:<br /><br />' + usernames.map(u => u.username).join('<br />') + '</p>',
        };

        try {
            const emailSent = await mailTransporter.sendMail(mailDetails);
            return emailSent ? { code: 200 } : { code: 500 };
        } catch (error) {
            console.log(error);
            return { code: 500 };
        }
    } else {
        // email address doesn't match any in the database
        return { code: 400 };
    }
}

export async function resetPassword(username: string, email: string) {
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
        const token = generateRandom(20);
        const link = `${process.env.BASE_URL}/reset-link/${user[0]._id}/${token}`;

        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: '<p>A password reset request for your rmlbb username <strong>"' + username + '"</strong> has been made for this email address.</p><p>Click this <a href="' + link + '">link</a> to reset your password. The link will expire in 1 hour.</p><p>If you did not request a password reset, ignore this email.</p>',
        };

        // add the reset token and expiration date to the user in the db
        const expiresDate = new Date(Date.now() + (60 * 60 * 1000));
        const updateResult = await db
            .collection('users')
            .updateOne({ _id: _id }, { $set: { resetPasswordToken: token, resetPasswordExpires: expiresDate } });

        if (updateResult?.modifiedCount !== 1) return { code: 500 };

        try {
            const emailSent = await mailTransporter.sendMail(mailDetails);
            return emailSent ? { code: 200 } : { code: 500 };
        } catch (error) {
            console.log(error);
            return { code: 500 };
        }
    } else {
        // username and email address doesn't match any user in the database
        return { code: 400 };
    }
}

// export async function changeAllPasswords() {
//     const { db } = await connectToDatabase();

//     const bulkOp = db.collection('users').initializeOrderedBulkOp();
//     const users = [];

//     await db
//         .collection('users')
//         .find({ _id: { $ne: 48 } })
//         .project({ _id: 1, username: 1 })
//         .forEach(function (doc) {
//             const salt = generateRandom(32);
//             const password = generateRandom(4);
//             const hashedPassword = hashPassword(password, salt);
//             users.push({ _id: doc._id, username: doc.username, password });
//             bulkOp.find({ '_id': doc._id }).updateOne({ $set: { password: hashedPassword, salt } });
//         });

//     await bulkOp.execute();

//     return users;
// }
