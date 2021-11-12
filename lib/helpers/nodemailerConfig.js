import nodemailer from 'nodemailer';

export const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rmlbb.noreply@gmail.com',
        pass: process.env.NO_REPLY_EMAIL_PASSWORD,
    },
});
