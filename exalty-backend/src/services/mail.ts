const nodemailer = require("nodemailer");

export default class MailService {
  private static instance: MailService;

  constructor() {}

  public static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  public async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    };
    await transporter.sendMail(mailOptions).catch(() => {
      throw new Error("Error while sending mail");
    });
  }

  // public async sendMailWithCron(
  //   to: string,
  //   subject: string,
  //   text: string,
  //   html: string,
  //   cronTime: string
  // ): Promise<void> {
  //   cron.schedule(cronTime, () => {
  //     this.sendMail(to, subject, text, html);
  //   });
  // }
}
