const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    console.log(`📤 Sending email to ${to}`);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
};

module.exports = sendEmail;
