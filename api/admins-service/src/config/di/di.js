const { createContainer, asValue } = require('awilix');

function initDI({ settings, services, utils, constants }, mediator) {
  mediator.once('init', () => {
    const container = createContainer();

    container.register({
      serverSettings: asValue(settings.serverSettings),
      logError: asValue(utils.logError),
      errorCodes: asValue(constants.errorCodes),
      authService: asValue(services.authService),
      rolesService: asValue(services.rolesService),
      usersService: asValue(services.usersService),
    });

    // we emit the container to be able to use it in the API
    mediator.emit('di.ready', container);
  });
}

module.exports.initDI = initDI;
