const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1): Create a transporter (Gmail - Yahoo - etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option.
  });
  // 2): Define the email options
  const mainOptions = {
    from: 'Mustafa Khaled <mostafakhaled0787314@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3): Send the email
  await transporter.sendMail(mainOptions);
};

module.exports = sendEmail;
