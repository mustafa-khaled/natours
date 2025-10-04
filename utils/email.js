const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Mustafa Khaled <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    // 1): Create a transporter (Gmail - Yahoo - etc.)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1): Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    const text = htmlToText(html);

    // 2): Define the email options
    const mainOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    // 3): Create a transport and send email
    await this.newTransport().sendMail(mainOptions);
  }

  async sendWelcome() {
    return await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    return await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
}

module.exports = Email;
