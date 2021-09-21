const status = require('http-status');

const hasValidRolePriority = async (req, res, next) => {
  const User = req.container.resolve('User');

  if (req.user && req.user.userId) {
    const currentUser = await User.findOne({ _id: req.user.userId })
      .lean()
      .populate({
        path: 'roles',
        select: 'priority',
        options: { sort: { priority: 1 } },
      });
    const modifiedUser = await User.findOne({ _id: req.params.id })
      .lean()
      .populate({
        path: 'roles',
        select: 'priority',
        options: { sort: { priority: 1 } },
      });

    if (!modifiedUser) {
      res.status(status.NOT_FOUND).json({ error: 'Modified user not found' });
    } else if (currentUser.roles[0].priority < modifiedUser.roles[0].priority) {
      next();
    } else {
      res.status(status.FORBIDDEN).json({ error: 'User has not permission' });
    }
  } else {
    res
      .status(status.UNAUTHORIZED)
      .json({ error: 'User has not authorized yet' });
  }
};

module.exports = hasValidRolePriority;
