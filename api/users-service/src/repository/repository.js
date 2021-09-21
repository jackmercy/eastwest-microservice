const bcrypt = require('bcrypt');

const repository = (container) => {
  const User = container.resolve('User');
  const authService = container.resolve('authService');
  const rolesService = container.resolve('rolesService');
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');

  const createUser = async (
    token,
    { firstName, lastName, emailAddress, password, roles },
  ) => {
    try {
      const newRoles = roles || [];
      const userRole = await rolesService.getRoleByAlias(token, 'user');
      if (newRoles.length === 0) {
        newRoles.push(userRole.id);
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        emailAddress,
        password: hashPassword,
        roles: newRoles,
      });

      return user;
    } catch (error) {
      logError('An error occured creating user', error, {
        firstName,
        lastName,
        emailAddress,
        password,
        roles,
      });
      throw {
        code: errorCodes.USER.CREATE_FAILED,
        msg: 'Can not create user',
        details: error,
      };
    }
  };

  const getUsers = async ({ skip = 0, limit = 20, sort = {}, ...filter }) => {
    try {
      const data = await User.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await User.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all users', error, filter);
      throw {
        code: errorCodes.USER.GET_ALL_FAILED,
        msg: 'Can not get list users',
        details: error,
      };
    }
  };

  const getAllUsersByRoleId = async ({ roleId, skip = 0, limit = 20 }) => {
    try {
      const filtering = { roles: { $in: [roleId] } };
      const data = await User.find(filtering).skip(skip).limit(limit);
      const count = await User.countDocuments(filtering);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all users by role id', error, {
        roleId,
      });
      throw {
        code: errorCodes.USER.GET_ALL_BY_ROLE_ID_FAILED,
        msg: 'Can not get list users by role id',
        details: error,
      };
    }
  };

  const getUserByEmail = async (emailAddress) => {
    try {
      const data = await User.findOne({ emailAddress });
      if (!data) {
        throw 'User does not exist';
      }

      return data;
    } catch (error) {
      logError('An error occured fetching user with email address', error, {
        emailAddress,
      });
      throw {
        code: errorCodes.USER.GET_ALL_BY_ROLE_ID_FAILED,
        msg: 'Can not get list users by role id',
        details: error,
      };
    }
  };

  const getUserById = async (id) => {
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw {
          code: errorCodes.USER.NOT_EXIST,
          msg: 'User does not exist',
        };
      }

      return user;
    } catch (error) {
      logError('An error occured fetching user by id', error, { id });
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      logError('An error occured removing a user by id', error, { id });
      throw {
        code: errorCodes.USER.DELETE_FAILED,
        msg: 'Can not delete user',
        details: error,
      };
    }
  };

  const login = async ({ emailAddress, password, rememberMe }) => {
    try {
      const user = await User.findOne({ emailAddress })
        .lean()
        .populate('roles', { alias: 1 });
      if (!user) {
        throw {
          code: errorCodes.USER.NOT_EXIST,
          msg: 'User does not exist',
        };
      }
      const matchingPassword = await bcrypt.compare(password, user.password);
      if (!matchingPassword) {
        throw {
          code: errorCodes.USER.EMAIL_OR_PASSWORD_INCORRECT,
          msg: 'Email address or password incorect',
        };
      }
      const response = await authService.generateToken({
        userId: user._id,
        emailAddress,
        roles: user.roles.map((role) => role.alias),
        rememberMe: rememberMe,
      });

      return response;
    } catch (error) {
      logError('An error occured login with email address', error, {
        emailAddress,
        rememberMe,
      });
      throw error;
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createUser,
    getUsers,
    getAllUsersByRoleId,
    getUserByEmail,
    getUserById,
    deleteUser,
    login,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject('connection db not supplied!');
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
