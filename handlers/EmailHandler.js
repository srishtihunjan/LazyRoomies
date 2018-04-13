const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'lazyroomnode@gmail.com', // generated ethereal user
            pass: 'jassibhadwa123' // generated ethereal password
        }
    });
    // setup email data with unicode symbols


    // send mail with defined transport object
    const sendMail = (toEmail, subject,  message) => {

        let mailOptions = {
            from: '"LazyRoomies" <lazyroomnode@gmail.com>', // sender address
            to: toEmail, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }

module.exports = sendMail;
