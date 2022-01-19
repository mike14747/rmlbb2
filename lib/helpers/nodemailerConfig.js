import nodemailer from 'nodemailer';

export const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NO_REPLY_EMAIL,
        pass: process.env.NO_REPLY_EMAIL_PASSWORD,
    },
});
