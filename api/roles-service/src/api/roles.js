const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/roles',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'create', scope: 'any', resource: 'role' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const role = await repo.createRole(req.body);
        res.status(status.CREATED).json(role._id);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/roles',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'role' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const queries = qs.parse(req.query, {
          decoder: (value) => {
            if (/^(\d+|\d*\.\d+)$/.test(value)) {
              return parseFloat(value);
            }

            const keywords = {
              true: true,
              false: false,
              null: null,
              undefined: undefined,
            };
            if (value in keywords) {
              return keywords[value];
            }

            return value;
          },
        });
        const data = await repo.getAllRoles(queries);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/roles/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'role' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getRoleById(req.params.id);
        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.get('/roles/alias/:alias', async (req, res, next) => {
    try {
      const data = await repo.getRoleByAlias(req.params.alias);
      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.delete(
    '/roles/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'delete', scope: 'any', resource: 'role' }],
      }),
      middlewares.hasValidRolePriority,
    ],
    async (req, res, next) => {
      try {
        await repo.deleteRole(req.params.id);
        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.post(
    '/roles/:roleId/permissions',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'update', scope: 'any', resource: 'role' },
          { action: 'create', scope: 'any', resource: 'permission' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const permission = await repo.createPermission(
          req.params.roleId,
          req.body,
        );
        res.status(status.CREATED).json(permission._id);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/roles/:roleId/permissions',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'role' },
          { action: 'read', scope: 'any', resource: 'permission' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const permissions = await repo.getAllPermissionsByRoleId({
          roleId: req.params.roleId,
          skip: Number(req.query.skip),
          limit: Number(req.query.limit),
        });
        res.status(status.OK).json(permissions);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/roles/:roleId/permissions/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'permission' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getPermissionById(
          req.params.roleId,
          req.params.id,
        );
        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/roles/:roleId/permissions/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'delete', scope: 'any', resource: 'permission' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deletePermission(req.params.roleId, req.params.id);
        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
