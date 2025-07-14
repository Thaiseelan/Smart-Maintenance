const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  logger: true,
  debug: true
});

const mailOptions = {
  from: `"Onich's Alert Bot" <${process.env.GMAIL_USER}>`,
  to: process.env.GMAIL_USER, // or any test mail
  subject: '🔥 Test Email From Nodemailer',
  text: 'This is a debug test email to verify if Gmail is accepting it.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('❌ ERROR:', error);
  }
  console.log('✅ Email sent:', info.response);
});
