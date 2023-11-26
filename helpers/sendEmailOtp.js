const nodemailer = require("nodemailer");

const sendEmailOtp = async (to, html, subject) => {
    // send email
    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASSWORD)
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    transport.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html,
    }).catch(err => console.log(err));
};

module.exports = { sendEmailOtp }