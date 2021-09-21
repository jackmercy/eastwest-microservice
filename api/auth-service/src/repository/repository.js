const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const isEqual = require('lodash.isequal');

const repository = (container) => {
  const jwtSettings = container.resolve('jwtSettings');
  const Role = container.resolve('Role');
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');

  const generateToken = async ({
    userId,
    emailAddress,
    roles,
    rememberMe,
    resource: model,
  }) => {
    try {
      const expiresIn = rememberMe
        ? jwtSettings.expiresInRemembered
        : jwtSettings.expiresIn;
      const token = jwt.sign(
        { userId, emailAddress, roles, resource: model || 'User' },
        jwtSettings.secret,
        { expiresIn },
      );

      return token;
    } catch (error) {
      logError('An error occured generating token', error, { emailAddress });
      throw {
        code: errorCodes.GENERATE_TOKEN.GENERATE_FAILED,
        msg: 'Can not generate token',
        details: error.toString(),
      };
    }
  };

  const verifyToken = async (token) => {
    try {
      if (!token) {
        throw {
          code: errorCodes.VERIFY_TOKEN.TOKEN_EMPTY,
          msg: 'Token empty',
        };
      }
      const data = await jwt.verify(token, jwtSettings.secret);
      if (!data.userId) {
        throw {
          code: errorCodes.VERIFY_TOKEN.USER_ID_NOT_FOUND,
          msg: 'UserId not found',
        };
      }
      if (!data.resource) {
        throw {
          code: errorCodes.VERIFY_TOKEN.RESOURCE_NOT_FOUND,
          msg: 'Resource not found',
        };
      }
      const user = await mongoose
        .model(data.resource)
        .findOne({ _id: data.userId, emailAddress: data.emailAddress })
        .lean()
        .populate('roles', { alias: 1 });
      if (!user) {
        throw {
          code: errorCodes.VERIFY_TOKEN.USER_NOT_EXIST,
          msg: 'User does not exist',
        };
      }
      if (!user.roles || user.roles.length === 0) {
        throw {
          code: errorCodes.VERIFY_TOKEN.USER_ROLES_EMPTY,
          msg: 'User has not any role',
        };
      }
      const roles = user.roles.map((role) => role.alias);
      if (!isEqual(roles, data.roles)) {
        throw {
          code: errorCodes.VERIFY_TOKEN.USER_ROLES_CHANGED,
          msg: "User's roles changed",
        };
      }

      return data;
    } catch (error) {
      logError('An error occured verifying token', error, { token });
      throw error;
    }
  };

  const verifyPermissions = async ({
    roles,
    oneOfPermissions,
    permissions,
  }) => {
    try {
      let hasPermissions = false;
      const validatedPermissions = permissions.map((permission) => ({
        ...permission,
        valid: false,
      }));
      await Promise.all(
        roles.map(async (alias) => {
          const role = await Role.findOne({ alias }, { permissions: 1 })
            .lean()
            .populate('permissions');
          if (!role)
            throw {
              code: errorCodes.VERIFY_PERMISSIONS.ROLE_NOT_FOUND,
              msg: `Role "${alias}" not exist`,
            };

          permissions.forEach((p, i) => {
            if (validatedPermissions[i].valid) return;
            const index = role.permissions.findIndex(
              (rl) =>
                rl.resource === p.resource &&
                rl.action === p.action &&
                rl.scope === p.scope,
            );
            validatedPermissions[i].valid = index !== -1;
          });
        }),
      );

      if (oneOfPermissions) {
        hasPermissions = validatedPermissions.some((p) => p.valid);
      } else {
        hasPermissions = validatedPermissions.every((p) => p.valid);
      }

      return { hasPermissions };
    } catch (error) {
      logError('An error occured verifying permission', error, {
        roles,
        oneOfPermissions,
        permissions,
      });
      throw error;
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    generateToken,
    verifyToken,
    verifyPermissions,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied!'));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
