const { createContainer, asValue } = require('awilix');

function initDI({ database, settings, models, utils, constants }, mediator) {
  mediator.once('init', () => {
    mediator.on('db.ready', (db) => {
      const container = createContainer();

      container.register({
        database: asValue(db),
        validate: asValue(models.validate),
        Role: asValue(models.Role),
        logError: asValue(utils.logError),
        errorCodes: asValue(constants.errorCodes),
        jwtSettings: asValue(settings.jwtSettings),
        serverSettings: asValue(settings.serverSettings),
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
