const rolesService = require('./roles.service');
const usersService = require('./users.service');
const authService = require('./auth.service');

module.exports = Object.assign({}, { authService, rolesService, usersService });
