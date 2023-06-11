const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../../utils/HttpError");
const { Users } = require("../../models/users");
const { ctrlWrapper } = require("../../utils/ctrlWrapper");

require("dotenv").config();

const { SECRET_KEY } = process.env;

async function login(req, res) {
  const { password, email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    HttpError(401, "Email or password is wrong");
  }
  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    console.log("compared", comparedPassword);
    HttpError(401, "Email or password is wrong");
  }

  const paylod = {
    id: user.id,
  };

  const token = jwt.sign(paylod, SECRET_KEY, { expiresIn: "10h" });
  await Users.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
}

module.exports = {
  login: ctrlWrapper(login),
};
