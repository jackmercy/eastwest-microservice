const status = require('http-status');

/**
 *
 * @param {*} permissions: permissions=[{ action, scope, resource }]
 */
const hasPermissions = ({ permissions, oneOfPermissions = false }) => async (
  req,
  res,
  next,
) => {
  const authService = req.container.resolve('authService');

  if (req.user || !req.user.roles || !req.user.roles.length) {
    try {
      const response = await authService.verifyPermissions({
        roles: req.user.roles,
        oneOfPermissions,
        permissions,
      });
      if (response.hasPermissions) {
        next();
      } else {
        res.status(status.FORBIDDEN).json({ error: 'User has not permission' });
      }
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
    }
  } else {
    res
      .status(status.UNAUTHORIZED)
      .json({ error: 'User has not authorized yet' });
  }
};

module.exports = hasPermissions;
