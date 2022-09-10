"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendForgotPasswordEmail = (userEmail, link) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'vivek.lokhande2801@gmail.com',
            pass: 'llakrhmtiwevjrpt',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: 'vivek.lokhande2801@gmail.com',
        to: userEmail,
        subject: 'password reset',
        text: `visit this link ${link} to reset your password`,
    };
    transporter.sendMail(mailOptions, (error, success) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('mail sent successfully!');
        }
    });
};
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
//# sourceMappingURL=EmailSender.js.map