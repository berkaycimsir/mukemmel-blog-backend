"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
// mail variable
const mail = {
    /*
     * this function takes the detail of mail as a parameter
     * and sending mail by using this details.
     */
    send: ({ name, email, subject, message }) => {
        const transporter = nodemailer.createTransport({
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
        const mailOptions = {
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
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    }
};
exports.default = mail;
//# sourceMappingURL=sendMail.js.map