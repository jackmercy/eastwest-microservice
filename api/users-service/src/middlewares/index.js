const authorized = require('./authorized');
const hasPermissions = require('./hasPermissions');
const hasValidRolePriority = require('./hasValidRolePriority');

module.exports = Object.create({
  authorized,
  hasPermissions,
  hasValidRolePriority,
});
