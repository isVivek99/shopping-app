const nodemailer = require('nodemailer');

function sendForgotPasswordEmail(userEmail, link) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vivek.lokhande2801@gmail.com',
      pass: 'llakrhmtiwevjrpt',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'vivek.lokhande2801@gmail.com',
    to: userEmail,
    subject: 'password reset',
    text: `visit this link ${link} to reset your password`,
  };
  transporter.sendMail(mailOptions, (error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('mail sent successfully!');
    }
  });
}

module.exports = sendForgotPasswordEmail;
