const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/news-authors',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'create', scope: 'any', resource: 'news-author' },
        ],
      }),
      middlewares.upload.fields([{ name: 'avatar', maxCount: 1 }]),
    ],
    async (req, res, next) => {
      try {
        const author = await repo.createAuthor(req.body, req.files);
        res
          .set('Location', `/news-authors/${author._id}`)
          .status(status.CREATED)
          .json(author);
      } catch (error) {
        console.log(JSON.stringify(error));
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/news-authors',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'read', scope: 'any', resource: 'news-author' },
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
        const response = await repo.getAuthors(queries);

        res.status(status.OK).json(response);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get('/news-authors/:id', async (req, res, next) => {
    try {
      const data = await repo.getAuthorById(req.params.id);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.put(
    '/news-authors/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'update', scope: 'any', resource: 'news-author' },
        ],
      }),
      middlewares.upload.fields([{ name: 'avatar', maxCount: 1 }]),
    ],
    async (req, res, next) => {
      try {
        const news = await repo.updateAuthor(
          req.token,
          req.params.id,
          req.body,
          req.files,
        );

        res.status(status.OK).json(news);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/news-authors/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'delete', scope: 'any', resource: 'news-author' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteAuthor(req.token, req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
