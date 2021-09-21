const { createContainer, asValue } = require('awilix');

function initDI({ settings, database, models, services, utils }, mediator) {
  mediator.once('init', () => {
    mediator.on('db.ready', (db) => {
      const container = createContainer();

      container.register({
        database: asValue(db),
        File: asValue(models.File),
        logError: asValue(utils.logError),
        serverSettings: asValue(settings.serverSettings),
        authService: asValue(services.authService),
        googleDriveService: asValue(services.googleDriveService),
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
