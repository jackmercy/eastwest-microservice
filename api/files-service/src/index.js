const { EventEmitter } = require('events');
const { asValue } = require('awilix');
const server = require('./server/server');
const repository = require('./repository/repository');
const di = require('./config');
const mediator = new EventEmitter();

console.log('--- Files Service ---');
console.log('Connecting to files repository...');

process.on('uncaughtException', (error) => {
  console.error('Unhandled Exception', error);
});

process.on('uncaughtRejection', (error) => {
  console.error('Unhandled Rejection', error);
});

mediator.on('di.ready', (container) => {
  repository
    .connect(container)
    .then((repo) => {
      console.log('Connected. Starting Server');
      container.register({ repo: asValue(repo) });
      return server.start(container);
    })
    .then((app) => {
      const { port } = container.resolve('serverSettings');
      console.log(`Server started succesfully, running on port: ${port}.`);
      app.on('close', () => {
        container.resolve('repo').disconnect();
      });
    });
});

mediator.on('di.error', (error) => {
  console.error('Something wrong', error)
})

di.init(mediator);

mediator.emit('init');
