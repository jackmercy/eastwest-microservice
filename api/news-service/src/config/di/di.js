const { createContainer, asValue } = require('awilix');

function initDI({ database, settings, models, services, constants, utils }, mediator) {
  mediator.once('init', () => {
    mediator.on('db.ready', (db) => {
      const container = createContainer();

      container.register({
        database: asValue(db),
        News: asValue(models.News),
        Author: asValue(models.Author),
        Comment: asValue(models.Comment),
        Category: asValue(models.Category),
        logError: asValue(utils.logError),
        errorCodes: asValue(constants.errorCodes),
        serverSettings: asValue(settings.serverSettings),
        authService: asValue(services.authService),
        filesService: asValue(services.filesService),
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
