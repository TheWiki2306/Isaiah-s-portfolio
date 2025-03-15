import { sendMail } from "../service/mailService.js";

export const submitContactForm = async (req, res) => {
  const { name, message } = req.body;

  try {
    const emailText = `Name: ${name}\nMessage: ${message}`;
    await sendMail(process.env.EMAIL_USER, "New submission", emailText);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
