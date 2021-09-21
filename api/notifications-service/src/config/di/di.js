const { createContainer, asValue } = require('awilix');

function initDI({ settings, models, services, templates, utils }, mediator) {
  mediator.once('init', () => {
    const container = createContainer();

    container.register({
      templates: asValue(templates),
      validate: asValue(models.validate),
      serverSettings: asValue(settings.serverSettings),
      logError: asValue(utils.logError),
      smsService: asValue(services.smsService),
      mailService: asValue(services.mailService),
      webpushService: asValue(services.webpushService),
    });

    // we emit the container to be able to use it in the API
    mediator.emit('di.ready', container);
  });
}

module.exports.initDI = initDI;
