const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/vacancies',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'create', scope: 'any', resource: 'vacancy' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const vacancy = await repo.createVacancy(req.body);

        res
          .set('Location', `/vacancies/${vacancy._id}`)
          .status(status.CREATED)
          .json(vacancy);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get('/vacancies', async (req, res, next) => {
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
      const response = await repo.getVacancies(queries);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error });
      next(error);
    }
  });

  app.get('/vacancies/slug/:slug', async (req, res, next) => {
    try {
      const data = await repo.getVacancyBySlug(req.params.slug);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.get('/vacancies/:id', async (req, res, next) => {
    try {
      const data = await repo.getVacancyById(req.params.id);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.put(
    '/vacancies/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'update', scope: 'any', resource: 'vacancy' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const vacancy = await repo.updateVacancy(req.params.id, req.body);

        res.status(status.OK).json(vacancy);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/vacancies/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'delete', scope: 'any', resource: 'vacancy' }],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteVacancy(req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
