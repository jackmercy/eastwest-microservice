const { createContainer, asValue } = require('awilix');

function initDI({ settings, models, utils }, mediator) {
  mediator.once('init', () => {
    const container = createContainer();

    container.register({
      validate: asValue(models.validate),
      logError: asValue(utils.logError),
      mailSettings: asValue(settings.mailSettings),
      serverSettings: asValue(settings.serverSettings),
    });

    // we emit the container to be able to use it in the API
    mediator.emit('di.ready', container);
  });
}

module.exports.initDI = initDI;
