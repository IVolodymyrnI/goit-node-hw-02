const nodemailer = require("nodemailer");

const configOption = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "volodymyr.yarchuuk@meta.ua",
    pass: "Goithomework06",
  },
};

const transporter = nodemailer.createTransport(configOption);

function sendEmail(data) {
  const message = { ...data, from: "volodymyr.yarchuuk@meta.ua" };

  transporter.sendMail(message).then(console.log).catch(console.log);
}

module.exports = sendEmail;
