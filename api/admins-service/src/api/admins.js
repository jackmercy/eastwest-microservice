const status = require('http-status');

module.exports = ({ repo, middlewares }, app) => {
  app.post('/admins', [middlewares.authorized], async (req, res, next) => {
    try {
      const admin = await repo.createAdmin(req.token, req.body);

      res
        .set('Location', `/admins/${admin._id}`)
        .status(status.CREATED)
        .json(admin);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });

  app.get('/admins', [middlewares.authorized], async (req, res, next) => {
    try {
      const data = await repo.getAllAdmins(req.token, {
        skip: Number(req.query.skip),
        limit: Number(req.query.limit),
      });

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.INTERNAL_SERVER_ERROR).json({ error });
      next(error);
    }
  });

  app.get('/admins/:id', [middlewares.authorized], async (req, res, next) => {
    try {
      const data = await repo.getAdminById(req.token, req.params.id);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
      next(error);
    }
  });

  app.delete(
    '/admins/:id',
    [middlewares.authorized],
    async (req, res, next) => {
      try {
        await repo.deleteAdmin(req.token, req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.post('/admins/login', async (req, res, next) => {
    try {
      const response = await repo.login(req.body);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });
};
