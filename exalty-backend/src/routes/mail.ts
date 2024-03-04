import express from "express";
import MailService from "../services/mail";
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, subject, message, html } = req.body;
  if (!email || !message) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const mail = await MailService.getInstance().sendMail(
    email,
    subject,
    message,
    html
  );
  res.json(mail);
});

router.post("/cron", async (req, res) => {
  const { email, subject, message, html, cronTime } = req.body;
  if (!email || !message || !cronTime) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const mail = await MailService.getInstance().sendMailWithCron(
    email,
    subject,
    message,
    html,
    cronTime
  );
  res.json(mail);
});

export default router;
