const status = require('http-status');

module.exports = ({ repo }, app) => {
  app.post('/notifications/prospect/new-request', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');

      const data = await validate(req.body, 'newProspect');
      await repo.createNewProspectEmail(data);

      res.status(status.OK).json({
        msg: `Send email to ${data.emailAddress} successful`,
      });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });

  app.post('/notifications/contact/new-request', async (req, res, next) => {
    try {
      const validate = req.container.resolve('validate');

      const data = await validate(req.body, 'newContact');
      await repo.createNewContactEmail(data);

      res.status(status.OK).json({
        msg: `Send email to ${data.emailAddress} successful`,
      });
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error });
      next(error);
    }
  });

  app.post(
    '/notifications/vacancies/new-application',
    async (req, res, next) => {
      try {
        const validate = req.container.resolve('validate');

        const data = await validate(req.body, 'newVacancyApplication');
        await repo.createNewVacancyApplicationEmail(data);

        res.status(status.OK).json({
          msg: `Send email to ${data.emailAddress} successful`,
        });
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.post(
    '/notifications/vacancies/resend-application',
    async (req, res, next) => {
      try {
        const validate = req.container.resolve('validate');

        const data = await validate(req.body, 'newVacancyApplication');
        await repo.resendVacancyApplicationEmail(data);

        res.status(status.OK).json({
          msg: `Send email to ${data.emailAddress} successful`,
        });
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );
};
