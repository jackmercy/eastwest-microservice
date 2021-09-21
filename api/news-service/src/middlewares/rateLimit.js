const rateLimit = require('express-rate-limit');

const customRateLimit = (maxRequest = 5, duration = 15 * 60 * 1000) =>
  rateLimit({
    windowMs: duration,
    max: maxRequest,
    message: {
      error: { msg: 'You have created many requests, please try again later' },
    },
  });

module.exports = customRateLimit;
