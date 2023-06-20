const { Users } = require("../models/users");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils/HttpError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

async function authenticate(req, _, next) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer" || token === undefined) {
      HttpError(401);
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById(id);

    if (!user || !user.token || token !== user.token) {
      HttpError(401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
