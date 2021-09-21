const status = require('http-status');

const hasValidRolePriority = async (req, res, next) => {
  const User = req.container.resolve('User');
  const Role = req.container.resolve('Role');
  const currentUser = await User.findOne({ _id: req.user.userId })
    .lean()
    .populate({
      path: 'roles',
      select: 'priority',
      options: { sort: { priority: 1 } },
    });
  const modifiedRole = await Role.findOne({ _id: req.params.id }).lean();

  if (!currentUser) {
    res.status(status.UNAUTHORIZED).json({ error: { msg: 'Unauthorized' } });
  } else if (!modifiedRole) {
    res
      .status(status.NOT_FOUND)
      .json({ error: { msg: 'Modified role not found' } });
  } else if (currentUser.roles[0].priority < modifiedRole.priority) {
    next();
  } else {
    res
      .status(status.FORBIDDEN)
      .json({ error: { msg: 'User has not permission' } });
  }
};

module.exports = hasValidRolePriority;
