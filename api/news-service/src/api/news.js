const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/news',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'create', scope: 'any', resource: 'news' }],
      }),
      middlewares.upload.fields([{ name: 'thumbnail', maxCount: 1 }]),
    ],
    async (req, res, next) => {
      try {
        const news = await repo.createNews(req.body, req.files);

        res
          .set('Location', `/news/${news._id}`)
          .status(status.CREATED)
          .json(news);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get('/news', async (req, res, next) => {
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
      const response = await repo.getNews(queries);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error });
      next(error);
    }
  });

  app.get('/news/slug/:slug', async (req, res, next) => {
    try {
      const data = await repo.getNewsBySlug(req.params.slug);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.get('/news/:id', async (req, res, next) => {
    try {
      const data = await repo.getNewsById(req.params.id);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.put(
    '/news/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'update', scope: 'any', resource: 'news' }],
      }),
      middlewares.upload.fields([{ name: 'thumbnail', maxCount: 1 }]),
    ],
    async (req, res, next) => {
      try {
        const news = await repo.updateNews(
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

  // Same with update news, but limit fields updated and no need authentication
  // Using for landing page to update views, likes, ...
  // updatedAt field will be prevent auto update
  app.put('/news/public/:id', async (req, res, next) => {
    try {
      const news = await repo.updatePublicNews(req.params.id, req.body);

      res.status(status.OK).json(news);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });

  app.delete(
    '/news/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'delete', scope: 'any', resource: 'news' }],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteNews(req.token, req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.post(
    '/news/:newsId/comments',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [
          { action: 'create', scope: 'any', resource: 'news-comment' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const comment = await repo.createComment(req.params.newsId, req.body);
        res
          .set('Location', `/news/${req.params.newsId}/comments/${comment._id}`)
          .status(status.CREATED)
          .json(comment);
      } catch (error) {
        console.log(JSON.stringify(error));
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get('/news/:newsId/comments', async (req, res, next) => {
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
      const response = await repo.getComments(req.params.newsId, queries);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error });
      next(error);
    }
  });

  app.get('/news/:newsId/comments/:id', async (req, res, next) => {
    try {
      const data = await repo.getCommentById(req.params.newsId, req.params.id);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.put(
    '/news/:newsId/comments/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        oneOfPermissions: true,
        permissions: [
          { action: 'update', scope: 'any', resource: 'news-comment' },
          { action: 'update', scope: 'own', resource: 'news-comment' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        const news = await repo.updateComment(
          req.params.newsId,
          req.params.id,
          req.body,
        );

        res.status(status.OK).json(news);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/news/:newsId/comments/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        oneOfPermissions: true,
        permissions: [
          { action: 'delete', scope: 'any', resource: 'news-comment' },
          { action: 'delete', scope: 'own', resource: 'news-comment' },
        ],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteComment(req.params.newsId, req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
