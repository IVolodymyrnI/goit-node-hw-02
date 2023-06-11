const bcrypt = require("bcrypt");
const { Users } = require("../../models/users");
const { HttpError } = require("../../utils/HttpError");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

async function register(req, res) {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    HttpError(409, "Email is in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await Users.create({ ...req.body, password: hashPassword });

  return res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
}

module.exports = {
  register: ctrlWrapper(register),
};
