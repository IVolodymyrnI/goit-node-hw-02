const sendEmail = require("../../middleware/sendEmail");
const { Users } = require("../../models/users");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");
require("dotenv").config();

const { BASE_URL } = process.env;

async function resendVerifyEmail(req, res) {
  const { email } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    HttpError(401, "User not found");
  }

  if (user.verify) {
    HttpError(401, "Verification has already been passed");
  }

  const message = {
    to: email,
    subject: "Node.js hw-06 for email verification",
    html: `<a href=${BASE_URL}/api/auth/users/verify/${user.verificationToken}" target="_blank">link</a>`,
  };

  sendEmail(message);

  res.json({ message: "Verification email sent" });
}

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
