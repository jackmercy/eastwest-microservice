const repository = (container) => {
  const rolesService = container.resolve('rolesService');
  const usersService = container.resolve('usersService');
  const logError = container.resolve('logError');
  const errorCodes = container.resolve('errorCodes');

  const createAdmin = async (
    token,
    { firstName, lastName, emailAddress, password },
  ) => {
    try {
      const adminRole = await rolesService.getRoleByAlias(token, 'admin');
      const admin = await usersService.createUser(token, {
        firstName,
        lastName,
        emailAddress,
        password,
        roles: [adminRole.id],
      });

      return admin;
    } catch (error) {
      logError('An error occured creating admin', error, { emailAddress });
      throw error;
    }
  };

  const getAllAdmins = async (token, { skip = 0, limit = 20 }) => {
    try {
      const adminRole = await rolesService.getRoleByAlias(token, 'admin');
      const data = await usersService.getAllUsersByRoleId(token, {
        roleId: adminRole.id,
        skip,
        limit,
      });

      return data;
    } catch (error) {
      logError('An error occured fetching all admins', error, { token });
      throw error;
    }
  };

  const getAdminById = async (token, id) => {
    try {
      const data = await usersService.getUserById(token, id);

      return data;
    } catch (error) {
      logError('An error occured fetching admin', error, { token, id });
      throw error;
    }
  };

  const deleteAdmin = async (token, id) => {
    try {
      await usersService.deleteUserById(token, id);
    } catch (error) {
      logError('An error occured removing admin', error, { token, id });
      throw error;
    }
  };

  const login = async (data) => {
    const allowedRoleAliases = ['superadmin', 'admin'];
    try {
      const response = await usersService.login(data);
      const user = await usersService.getUserByEmail(
        response.token,
        data.emailAddress,
      );
      const roles = await rolesService.getRoles(response.token);
      if (!roles || !roles.data || roles.data.length === 0) {
        throw { code: errorCodes.LOGIN.EMPTY_ROLE, msg: 'Roles data is empty' };
      }
      const allowedRoleIds = roles.data
        .filter((role) => allowedRoleAliases.includes(role.alias))
        .map((role) => role.id);
      if (!user.roles.some((roleId) => allowedRoleIds.includes(roleId))) {
        throw {
          code: errorCodes.LOGIN.ROLE_NOT_ALLOWED,
          msg: "Account hasn't permission",
        };
      }

      return response;
    } catch (error) {
      logError('An error occured login into admin', error, { data });
      throw error;
    }
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    createAdmin,
    getAllAdmins,
    getAdminById,
    deleteAdmin,
    login,
    disconnect,
  });
};

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error('dependencies not supplied!'));
    }
    resolve(repository(container));
  });
};

module.exports = Object.assign({}, { connect });
