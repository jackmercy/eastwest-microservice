const { initDI } = require('./di');
const database = require('./db');
const settings = require('./config');
const models = require('../models');
const utils = require('../utils');
const constants = require('../constants');

const init = initDI.bind(null, {
  database,
  settings,
  models,
  utils,
  constants,
});

module.exports = Object.assign({}, { init });
