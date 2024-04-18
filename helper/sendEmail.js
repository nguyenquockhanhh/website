const nodemailer = require("nodemailer");
const config = require('../config/config')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: config.Host,
    port: config.Port,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config.Username,
        pass: config.Password,
    },
});

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function (desEmail,message) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: desEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: '', // plain text body
        html:message
    });
    console.log("Message sent: %s", message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}