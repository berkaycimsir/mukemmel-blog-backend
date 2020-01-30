import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

// mail type for mail variable
interface IMailType {
  send: (data: IData) => void;
}

// interface for data parameter
interface IData {
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

// mail variable
const mail: IMailType = {
  /*
   * this function takes the detail of mail as a parameter
   * and sending mail by using this details.
   */
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
        <h1 style="font-size: 20px;">Berkay'ın Bloğu İletişim Aracından Bir Mesaj!</h1>
        <ul>
          <li>
            <b>Gönderen:</b> ${name}
          </li>
          <li>
            <b>Gönderenin Emaili:</b> ${email}
          </li>
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
