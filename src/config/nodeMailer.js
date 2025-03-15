import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const mailer = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  //   debug: true,
  //   logger: true,
});
