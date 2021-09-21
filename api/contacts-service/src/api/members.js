const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/community-members',
    [middlewares.rateLimit(5, 10 * 60 * 1000)],
    async (req, res, next) => {
      try {
        const member = await repo.createMember(req.body);

        res
          .set('Location', `/community-members/${member._id}`)
          .status(status.CREATED)
          .json(member);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/community-members',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'community-member' },
        ],
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
        const data = await repo.getMembers(queries);
        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/community-members/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'community-member' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getMemberById(req.params.id);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.put(
    '/community-members/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'update', scope: 'any', resource: 'community-member' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.updateMember(req.params.id, req.body);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/community-members/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'delete', scope: 'any', resource: 'community-member' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteMember(req.token, req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.post(
    '/community-members/:memberId/activities',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          {
            action: 'create',
            scope: 'own',
            resource: 'community-member-activity',
          },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const activity = await repo.createMemberActivity(
          req.params.memberId,
          req.body,
        );

        res
          .set(
            'Location',
            `/community-members/${req.params.memberId}/activities/${activity._id}`,
          )
          .status(status.CREATED)
          .json(activity);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/community-members/:memberId/activities',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          {
            action: 'read',
            scope: 'any',
            resource: 'community-member-activity',
          },
        ],
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
        const data = await repo.getMemberActivities({
          ...queries,
          member: req.params.memberId,
        });
        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/community-members/:memberId/activities/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          {
            action: 'read',
            scope: 'any',
            resource: 'community-member-activity',
          },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getMemberActivityById(
          req.params.memberId,
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
    '/community-members/:memberId/activities/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          {
            action: 'delete',
            scope: 'any',
            resource: 'community-member-activity',
          },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteMemberActivity(req.params.memberId, req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.post('/community-members/login', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');
      const data = await validate(req.body, 'login');
      const response = await repo.loginAsCommunityMember(data);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });
};
