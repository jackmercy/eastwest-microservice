const status = require('http-status');
const fs = require('fs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/files',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'create', scope: 'any', resource: 'file' }],
      }),
      middlewares.upload.any(),
    ],
    async (req, res, next) => {
      try {
        const files = await repo.uploadFiles(req.files, req.body.directory, {
          public: !!req.body.public,
        });

        res.status(status.CREATED).json(files);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.post(
    '/files/public',
    [middlewares.rateLimit(5, 10 * 60 * 1000), middlewares.upload.any()],
    async (req, res, next) => {
      try {
        const files = await repo.uploadFiles(req.files, req.body.directory, {
          public: true,
        });

        res.status(status.CREATED).json(files);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get('/files/public/:id', async (req, res, next) => {
    try {
      const file = await repo.downloadFile(req.params.id, { public: true });

      res.sendFile(file.path, (error) => {
        if (error) {
          console.log(error);
        } else {
          // remove local file after sent
          fs.unlinkSync(file.path);
        }
      });
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.get(
    '/files/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'file' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const file = await repo.downloadFile(req.params.id);

        res.sendFile(file.path, (error) => {
          if (error) {
            console.log(error);
          } else {
            // remove local file after sent
            fs.unlinkSync(file.path);
          }
        });
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/files/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'delete', scope: 'any', resource: 'file' }],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteFile(req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
