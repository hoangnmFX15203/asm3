const nodemailer = require('nodemailer');

const sendMail = async ({ email, html, subject }) => {
    let transporter = nodemailer.createTransporter({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Cua hang dien tu" <no-reply@cuahangdientu.com>',
        to: email,
        subject: subject,
        html: html,
    });

    return info;
};

module.exports = sendEmail;
