import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

interface IMailType {
  send: (data: any) => void;
}

interface IData {
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

const mail: IMailType = {
  send: ({ name, email, subject, message }: IData): void => {
    const transporter: Mail = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      tls: {
        ciphers: "SSLv3"
      },
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions: Mail.Options = {
      from: `Berkayın Bloğu, Ziyaretçi: ${name}`,
      to: `${process.env.MAIL_USER}`,
      subject: `${subject}`,
      html: `
        <h1>Berkay'ın Bloğu İletişim Aracından Bir Mesaj!</h1>
        <ul>
          <li>Gönderen: ${name}</li>
          <li>Gönderenin Emaili: ${email}</li>
        </ul>
        <br />
        <b>Mesaj: </b>
        <p>${message}</p>
      `
    };

    transporter.sendMail(mailOptions, (error: Error, info: any): void => {
      if (error) {
        return console.log(error);
      }
    });
  }
};

export default mail;
