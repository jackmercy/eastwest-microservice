const authService = require('./auth.service');
const rolesService = require('./roles.service');
const notificationsService = require('./notifications.service');

module.exports = Object.assign(
  {},
  { authService, rolesService, notificationsService },
);
