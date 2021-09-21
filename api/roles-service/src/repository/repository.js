const repository = (container) => {
  const User = container.resolve('User');
  const Role = container.resolve('Role');
  const Permission = container.resolve('Permission');
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');

  const createRole = async ({ alias, name, priority }) => {
    try {
      const role = await Role.create({ alias, name, priority });

      return role;
    } catch (error) {
      logError('An error occured creating new role', error, {
        alias,
        name,
        priority,
      });
      throw {
        code: errorCodes.ROLE.CREATE_FAILED,
        msg: 'Can not create role',
        details: error,
      };
    }
  };

  const getAllRoles = async ({
    skip = 0,
    limit = 20,
    sort = {},
    ...filter
  }) => {
    try {
      const data = await Role.find(filter)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort(sort);
      const count = await Role.countDocuments(filter);

      return { count, data };
    } catch (error) {
      logError('An error occured fetching all roles', error, { filter });
      throw {
        code: errorCodes.ROLE.GET_ALL_FAILED,
        msg: 'Can not get list roles',
        details: error,
      };
    }
  };

  const getRoleById = async (id) => {
    try {
      const role = await Role.findOne({ _id: id });
      if (!role) {
        throw { code: errorCodes.ROLE.NOT_EXIST, msg: 'Role does not exist' };
      }

      return role;
    } catch (error) {
      logError('An error occured fetching role', error, { id });
      throw error;
    }
  };

  const getRoleByAlias = async (alias) => {
    try {
      // Now we public this api because in some case like create user, member,..
      // Users have not logged in yet, so they cannot get this api with authorization header 
      // so we public api and only populate some fields for security
      const role = await Role.findOne({ alias }, { _id: 1, alias: 1 });
      if (!role) {
        throw { code: errorCodes.ROLE.NOT_EXIST, msg: 'Role does not exist' };
      }

      return role;
    } catch (error) {
      logError('An error occured fetching role with alias', error, { alias });
      throw error;
    }
  };

  const deleteRole = async (id) => {
    try {
      const role = await Role.findOne({ _id: id }, { _id: 1 });
      if (role) {
        await Permission.deleteMany({ roleId: id });
        await Role.deleteOne({ _id: id });
        await User.update({}, { $pull: { roles: id } }, { multi: true });
      }
    } catch (error) {
      logError('An error occured removing role', error, { id });
      throw {
        code: errorCodes.ROLE.DELETE_FAILED,
        msg: 'Can not delete role',
        details: error,
      };
    }
  };

  const createPermission = async (roleId, { resource, action, scope }) => {
    try {
      const role = await Role.findOne({ _id: roleId });
      if (!role) {
        throw 'Role does not exist';
      }
      const permission = await Permission.create({
        roleId,
        resource,
        action,
        scope,
        shortDes: [role.alias, action, scope, resource].join('-'),
      });
      role.permissions.push(permission);
      await role.save();

      return permission;
    } catch (error) {
      logError('An error occured creating new role permission', error, {
        roleId,
        resource,
        action,
        scope,
      });
      throw {
        code: errorCodes.PERMISSION.CREATE_FAILED,
        msg: 'Can not create permission',
        details: error,
      };
    }
  };

  const getAllPermissionsByRoleId = async ({
    roleId,
    skip = 0,
    limit = 20,
  }) => {
    try {
      const data = await Permission.find({ roleId }).skip(skip).limit(limit);
      const count = await Permission.countDocuments({ roleId });

      return { count, data };
    } catch (error) {
      logError(
        'An error occured fetching all role permissions by roleId',
        error,
        { roleId },
      );
      throw {
        code: errorCodes.PERMISSION.GET_ALL_FAILED,
        msg: 'Can not get list permissions',
        details: error,
      };
    }
  };

  const getPermissionById = async (roleId, id) => {
    try {
      const permission = await Permission.findOne({ _id: id, roleId });
      if (!permission) {
        throw {
          code: errorCodes.PERMISSION.NOT_EXIST,
          msg: 'Permission does not exist',
        };
      }
      return permission;
    } catch (error) {
      logError('An error occured fetching permission by id', error, {
        roleId,
        id,
      });
      throw error;
    }
  };

  const deletePermission = async (roleId, id) => {
    try {
      await Permission.deleteOne({ _id: id, roleId });
    } catch (error) {
      logError('An error occured removing permission by id', error, {
        roleId,
        id,
      });
      throw {
        code: errorCodes.PERMISSION.DELETE_FAILED,
        msg: 'Can not delete permission',
        details: error,
      };
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createRole,
    getAllRoles,
    getRoleById,
    getRoleByAlias,
    deleteRole,
    createPermission,
    getAllPermissionsByRoleId,
    getPermissionById,
    deletePermission,
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
