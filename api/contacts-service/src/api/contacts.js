const status = require('http-status');
const qs = require('qs');

module.exports = ({ repo, middlewares }, app) => {
  app.post(
    '/contacts',
    [middlewares.rateLimit(2, 10 * 60 * 1000)],
    async (req, res, next) => {
      try {
        const contact = await repo.createContact(req.body);

        res
          .set('Location', `/contacts/${contact._id}`)
          .status(status.CREATED)
          .json(contact);
      } catch (error) {
        res.status(status.BAD_REQUEST).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/contacts',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'contact' }],
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
        const data = await repo.getContacts(queries);
        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );

  app.get(
    '/contacts/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'read', scope: 'any', resource: 'contact' }],
      }),
    ],
    async (req, res, next) => {
      try {
        const data = await repo.getContactById(req.params.id);

        res.status(status.OK).json(data);
      } catch (error) {
        res.status(status.NOT_FOUND).json({ error });
        next(error);
      }
    },
  );

  app.delete(
    '/contacts/:id',
    [
      middlewares.authorized,
      middlewares.hasPermissions({
        permissions: [{ action: 'delete', scope: 'any', resource: 'contact' }],
      }),
    ],
    async (req, res, next) => {
      try {
        await repo.deleteContact(req.params.id);

        res.status(status.NO_CONTENT).json();
      } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error });
        next(error);
      }
    },
  );
};
