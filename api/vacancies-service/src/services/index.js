const authService = require('./auth.service');
const filesService = require('./files.service');
const notificationsService = require('./notifications.service');

module.exports = Object.assign(
  {},
  { authService, filesService, notificationsService },
);
