const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/users',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'create', scope: 'any', resource: 'user' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const user = await repo.createUser(req.token, req.body);

        res
          .set('Location', `/users/${user._id}`)
          .status(status.CREATED)
          .json(user);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/users',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'user' }],
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
        const response = await repo.getUsers(queries);

        res.status(status.OK).json(response);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/users/role/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'user' },
          { action: 'read', scope: 'any', resource: 'role' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getAllUsersByRoleId({
          roleId: req.params.id,
          skip: Number(req.query.skip),
          limit: Number(req.query.limit),
        });
        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/users/email/:email',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'user' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getUserByEmail(req.params.email);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/users/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'user' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getUserById(req.params.id);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  // app.put(
  //   '/users/:id',
  //   [
  //     middlewares.authorized,
  //     middlewares.hasPermissions({
  //       oneOfPermissions: true,
  //       permissions: [
  //         { action: 'update', scope: 'any', resource: 'user' },
  //         { action: 'update', scope: 'own', resource: 'user' },
  //       ],
  //     }),
  //     middlewares.hasValidRolePriority,
  //   ],
  //   async (req, res, next) => {
  //     try {
  //       const user = await repo.updateUser(req.body);

  //       res.status(status.OK).json(user);
  //     } catch (error) {
  //       res.status(status.BAD_REQUEST).json({ error });
  //       next(error);
  //     }
  //   },
  // );

  app.delete(
    '/users/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'delete', scope: 'any', resource: 'user' }],
      }),
      middlewares.hasValidRolePriority,
    ],
    async (req, res, next) => {
      try {
        await repo.deleteUser(req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.post('/users/login', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');
      const data = await validate(req.body, 'login');
      const response = await repo.login(data);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });
};
