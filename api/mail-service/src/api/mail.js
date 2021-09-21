const status = require('http-status');

module.exports = ({ repo }, app) => {
  app.post('/mail/send-mail', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');
      const mail = await validate(req.body, 'mail');
      await repo.sendMail(mail);
      res
        .status(status.OK)
        .json({ msg: `Send email to ${mail.to} successful` });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });
};
