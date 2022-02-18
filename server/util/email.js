const nodemailer = require('nodemailer')
require('dotenv').config()
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

const fs = require('fs/promises')
const path = require('path')



const sendMail = ({ to, subject, html }) => {
  let mailOptions = {
    from: "sameer.nadeem24@gmail.com",
    to,
    subject,
    html,
    // attachments: [
    //   {   // file on disk as an attachment
    //     filename: ' ',
    //     path: `${path.join(__dirname, '..', '..', 'html', "images", 'banaodukaan_logo_text.png')}` // stream this file
    //   }
    // ]
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}


// fs.readFile(path.join(__dirname, "..", '..', 'html', 'email.html')).then((htmlMsg) =>
//   sendMail({ to: "sameer.nadeem24@gmail.com", subject: "Welcome to Banaodukaan", html: htmlMsg })
// )


module.exports = sendMail
