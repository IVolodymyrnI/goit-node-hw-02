const { HttpError } = require("../utils/HttpError");

const validateData = (schema) => {
  const func = (req, _, next) => {
    const isObjectEmpty = Object.keys(req.body).length === 0;
    const { error } = schema.validate(req.body);

    if (isObjectEmpty) {
      HttpError(400, { message: "missing fields" });
    }

    if (error) {
      next(HttpError(400, { message: error.message }));
    }

    next();
  };

  return func;
};

module.exports = {
  validateData,
};
