const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { Users } = require("../../models/users");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");
const { nanoid } = require("nanoid");
const sendEmail = require("../../middleware/sendEmail");
require("dotenv").config();

const { BASE_URL } = process.env;

async function register(req, res) {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    HttpError(409, "Email is in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await Users.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const message = {
    to: email,
    subject: "Node.js hw-06 for email verification",
    html: `<a href="${BASE_URL}/api/auth/users/verify/${verificationToken}" target="_blank">link</a>`,
  };

  sendEmail(message);

  return res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
}

module.exports = {
  register: ctrlWrapper(register),
};
