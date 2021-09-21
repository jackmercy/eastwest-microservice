const upload = require('./upload');
const rateLimit = require('./rateLimit');
const authorized = require('./authorized');
const hasPermissions = require('./hasPermissions');

module.exports = Object.create({
  upload,
  rateLimit,
  authorized,
  hasPermissions,
});
