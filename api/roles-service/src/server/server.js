const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morganBody = require('morgan-body'); // logger middleware
const helmet = require('helmet'); // http secure
const spdy = require('spdy'); // Create nodejs server with HTTP/2 method
const bodyParser = require('body-parser');
const rolesApi = require('../api/roles');
const middlewares = require('../middlewares');

const start = (container) => {
  return new Promise((resolve, reject) => {
    // here we grab our dependencies needed for the server
    const { port, ssl } = container.resolve('serverSettings');
    const repo = container.resolve('repo');

    if (!repo) {
      reject(
        new Error('The server must be started with a connected repository'),
      );
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'));
    }

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    // Logger
    const logDir = path.join(path.dirname(require.main.path), '.tmp/logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    // log only 4xx and 5xx responses
    morganBody(app, {
      logAllReqHeader: true,
      filterParameters: ['password'],
      skip: (req, res) => res.statusCode < 400,
      stream: fs.createWriteStream(path.join(logDir, 'error.log'), {
        flags: 'a',
      }),
    });
    // log all requests to access.log
    morganBody(app, {
      logAllReqHeader: true,
      filterParameters: ['password'],
      logResponseBody: false,
      stream: fs.createWriteStream(path.join(logDir, 'access.log'), {
        flags: 'a',
      }),
    });
    app.use(helmet());
    app.use((error, req, res, next) => {
      reject(new Error(`Something went wrong!, error: ${error}`));
      res.status(500).send('Something went wrong!');
    });

    // here is where we register the container as middleware into req
    app.use((req, res, next) => {
      req.container = container.createScope();
      next();
    });

    // here we inject the repo to the API, since the repo is need it for all of our functions
    // and we are using inversion of control to make it available
    // repo can be resolved in req.container, why we do this?
    // repo is used whole api file, but req.container only be used when we need it
    rolesApi.bind(null, { repo, middlewares })(app);

    if (process.env.ENABLE_SSL) {
      const server = spdy
        .createServer(ssl, app)
        .listen(port, () => resolve(server));
    } else {
      const server = app.listen(port, () => resolve(server));
    }
  });
};

module.exports = Object.assign({}, { start });
