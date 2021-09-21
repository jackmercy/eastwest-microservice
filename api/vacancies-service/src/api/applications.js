const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/vacancy-applications',
    [
      middlewares.rateLimit(2, 10 * 60 * 1000),
      middlewares.upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'resumes', maxCount: 3 },
      ]),
    ],
    async (req, res, next) => {
      try {
        const application = await repo.createApplication(req.body, req.files);
        res
          .set('Location', `/vacancy-applications/${application._id}`)
          .status(status.CREATED)
          .json(application);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/vacancy-applications',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'vacancy-application' },
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
        const response = await repo.getApplications(queries);

        res.status(status.OK).json(response);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/vacancy-applications/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'vacancy-application' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getApplicationById(req.params.id);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  // TODO: We have update function for application
  // But in this case not necessary for admin to edit it, so we ignore it for this time
  // app.put(
  //   '/vacancy-applications/:id',
  //   [
  //     middlewares.authorized,
  //     middlewares.hasPermissions({
  //       permissions: [
  //         { action: 'update', scope: 'any', resource: 'vacancy-application' },
  //       ],
  //     }),
  //   ],
  //   async (req, res, next) => {
  //     try {
  //       const vacancy = await repo.updateApplication(req.params.id, req.body);

  //       res.status(status.OK).json(vacancy);
  //     } catch (error) {
  //       res
  //         .status(status.BAD_REQUEST)
  //         .json({ error });
  //       next(error);
  //     }
  //   },
  // );

  app.delete(
    '/vacancy-applications/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'delete', scope: 'any', resource: 'vacancy-application' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteApplication(req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
