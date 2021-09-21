const status = require('http-status');

const authorized = async (req, res, next) => {
  const authService = req.container.resolve('authService');
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const data = await authService.verifyToken(token);
      req.user = { ...data };
      req.token = token;
      next();
    } catch (error) {
      res.status(status.UNAUTHORIZED).json({ error });
    }
  } else {
    res
      .status(status.UNAUTHORIZED)
      .json({ error: 'Missing authorization header' });
  }
};

module.exports = authorized;
