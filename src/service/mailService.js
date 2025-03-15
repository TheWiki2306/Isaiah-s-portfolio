import { mailer } from "../config/nodeMailer.js";

export const sendMail = (to, subject, text) => {
  const mailOptions = {
    // from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return mailer.sendMail(mailOptions);
};
