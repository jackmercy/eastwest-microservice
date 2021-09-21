const { createContainer, asValue } = require('awilix');

function initDI(
  { settings, database, models, services, utils, constants },
  mediator,
) {
  mediator.once('init', () => {
    mediator.on('db.ready', (db) => {
      const container = createContainer();

      container.register({
        database: asValue(db),
        validate: asValue(models.validate),
        User: asValue(models.User),
        logError: asValue(utils.logError),
        errorCodes: asValue(constants.errorCodes),
        serverSettings: asValue(settings.serverSettings),
        authService: asValue(services.authService),
        rolesService: asValue(services.rolesService),
      });

      // we emit the container to be able to use it in the API
      mediator.emit('di.ready', container);
    });

    mediator.on('db.error', (error) => {
      mediator.emit('di.error', error);
    });

    database.connect(settings.dbSettings, mediator);

    mediator.emit('boot.ready');
  });
}

module.exports.initDI = initDI;
