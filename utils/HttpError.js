const ErrorStatusList = {
  400: "Bad request",
  401: "Unauthorized",
};

const HttpError = (statusCode, message = ErrorStatusList[statusCode]) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;

  throw error;
};

module.exports = {
  HttpError,
};
