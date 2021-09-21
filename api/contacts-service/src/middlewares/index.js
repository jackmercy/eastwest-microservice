const rateLimit = require('./rateLimit');
const authorized = require('./authorized');
const hasPermissions = require('./hasPermissions');

module.exports = Object.create({
  rateLimit,
  authorized,
  hasPermissions,
});
