import { connectToDatabase } from '../../utils/mongodb';
import nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rmlbb.noreply@gmail.com',
        pass: process.env.NO_REPLY_EMAIL_PASSWORD,
    },
});

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

const forgottenUsername = async (email) => {
    const { db } = await connectToDatabase();

    console.log('User with email address of:', email, 'submitted a forgotten username request.');

    // find out if the email submitted is actually a valid email associated with a registered user
    const user = await db
        .collection('users')
        .find({ email: email })
        .project({ _id: 0, password: 0, email: 0 })
        .toArray();

    console.log('user:', user);

    if (user.length > 0) {
        // since it is a valid email address associated with a registered user, send an email to the user with their username
        console.log('the submitted email address matches a registered user');
        const mailDetails = {
            from: 'rmlbb.noreply@gmail.com',
            to: email,
            subject: 'Test mail',
            text: 'A request for your rmlbb username(s) has been made for this email address. The rmlbb username(s) associated with this email address is/are: "' + user.map(u => u.username).join(', ') + '".',
        };

        try {
            const emailSent = await mailTransporter.sendMail(mailDetails);
            return emailSent ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }

        // mailTransporter.sendMail(mailDetails, function (err, data) {
        //     if (err) {
        //         console.log('An error occurred sending email');
        //     } else {
        //         console.log(data);
        //         console.log('Email sent successfully');
        //     }
        // });

    } else {
        // if it is not a valid email address, what should be done?
        console.log('the submitted email address does NOT match a registered user');
        return false;
    }
};

const forgottenPassword = async (username) => {
    const { db } = await connectToDatabase();

    console.log('User with username of:', username, 'submitted a forgotten password request.');
};

module.exports = {
    getUserForSignin,
    getUserProfile,
    updateUserProfile,
    forgottenUsername,
    forgottenPassword,
};
