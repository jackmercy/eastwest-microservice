const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/vacancy-categories',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'create', scope: 'any', resource: 'vacancy-category' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const category = await repo.createCategory(req.body);

        res
          .set('Location', `/vacancy-categories/${category._id}`)
          .status(status.CREATED)
          .json(category);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get('/vacancy-categories', async (req, res, next) => {
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
      const response = await repo.getCategories(queries);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error });
      next(error);
    }
  });

  app.get('/vacancy-categories/:id', async (req, res, next) => {
    try {
      const data = await repo.getCategoryById(req.params.id);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.put(
    '/vacancy-categories/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'update', scope: 'any', resource: 'vacancy-category' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const category = await repo.updateCategory(req.params.id, req.body);

        res.status(status.OK).json(category);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/vacancy-categories/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'delete', scope: 'any', resource: 'vacancy-category' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteCategory(req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
