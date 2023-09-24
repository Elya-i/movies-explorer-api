const rateLimit = require('express-rate-limit');
const { LIMITER_MESSAGE } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: LIMITER_MESSAGE,
});

module.exports = limiter;
