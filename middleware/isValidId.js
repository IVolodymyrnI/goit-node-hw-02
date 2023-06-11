const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils/HttpError");

const isValidId = (req, res, next) => {
  const { id } = req.params;

	if (!isValidObjectId(id)) {
    HttpError(400, `${id} is not valid`);
  }

  next();
};

module.exports = isValidId;
