// mailer.js

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Create Mailgen instance
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "YourApp",
    link: "https://yourapp.com/",
  },
});

const generateResetPasswordMail = (email, otp) => {
  // Generate email template using Mailgen
  const emailTemplate = {
    body: {
      name: "User",
      intro: "You requested to reset your password. Here is your OTP:",
      action: {
        instructions: "Please use the following OTP to reset your password:",
        button: {
          color: "#DC4D2F",
          text: otp,
        },
      },
      outro: "If you did not request this, please ignore this email.",
    },
  };

  const emailBody = mailGenerator.generate(emailTemplate);

  return {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset Password",
    html: emailBody,
  };
};

const sendMail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

module.exports = { generateResetPasswordMail, sendMail };
