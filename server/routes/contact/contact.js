const express = require('express');
const router = express.Router();
const { contactValidation } = require('./contactValidation');

const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.CONTACT_US_GMAIL,
//     pass: process.env.CONTACT_US_PASSWORD
//   }
// })

const transporter = nodemailer.createTransport({
  host: 'us2.smtp.mailhostbox.com',
  port: 25,
  secure: false,
  ignoreTLS: true,
  auth: {
    user: process.env.EMAIL_USER_CONTACT,
    pass: process.env.EMAIL_PASS_CONTACT,
  }
})



router.post('/', (req, res) => {
  const request = {
    fullName: req.body.fullName,
    contactNum: req.body.contactNum === '' ? null : req.body.contactNum,
    email: req.body.email,
    message: req.body.message,
  }
  const validation = contactValidation(request);

  if (validation.error) return res.json(validation);

  const mailOptions = {
    from: `Max808 Lending - Contact Us <contactus@max808lending.com>`,
    to: 'contactus@max808lending.com',
    subject: 'Max808 Lending Corporation - Contact Us',
    html: `
    <p><b>From:</b> ${req.body.fullName}</p>
    <p><b>Email:</b> ${req.body.email}</p>
    <p><b>Contact Number:</b> ${req.body.contactNum || '-'}</p>
    <p><b>Message body:</b></p>
    <p>${req.body.message}</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.json({
        success: false,
        message: "There's an error sending your message. Please try again.",
      });
    }
    else {
      return res.json({
        success: true,
        message: "Message has been successfully sent. We will get back to you as soon as possible. Thank you for contacting us!",
      });
    }
  });
})

module.exports = router;