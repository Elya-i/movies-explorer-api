const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { REQUIRED_AUTHORIZATION_MESSAGE } = require('../utils/constants');

require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(REQUIRED_AUTHORIZATION_MESSAGE));
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError(REQUIRED_AUTHORIZATION_MESSAGE));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
