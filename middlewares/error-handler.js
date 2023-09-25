const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? INTERNAL_SERVER_ERROR_MESSAGE
      : message,
  });
  next();
};

module.exports = errorHandler;
