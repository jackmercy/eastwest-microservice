const status = require('http-status');

module.exports = ({ repo }, app) => {
  app.post('/auth/generate-token', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');
      const data = await validate(req.body, 'claims');
      const token = await repo.generateToken(data);

      res.status(status.OK).json({ token });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });

  app.post('/auth/verify-token', async (req, res, next) => {
    try {
      const data = await repo.verifyToken(req.body.token);

      res.status(status.OK).json(data);
    } catch (error) {
      res.status(status.UNAUTHORIZED).json({ error });
      next(error);
    }
  });

  app.post('/auth/verify-permissions', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');
      const data = await validate(req.body, 'permission');
      const response = await repo.verifyPermissions(data);

      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });
};
