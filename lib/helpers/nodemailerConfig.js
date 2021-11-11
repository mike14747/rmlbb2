import nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rmlbb.noreply@gmail.com',
        pass: process.env.NO_REPLY_EMAIL_PASSWORD,
    },
});

const mailDetails = {
    from: 'rmlbb.noreply@gmail.com',
    // to: email,
    subject: 'Test mail',
    text: 'Node.js testing mail for nodemailer',
};

mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.log('An error occurred sending email');
    } else {
        console.log(data);
        console.log('Email sent successfully');
    }
});
