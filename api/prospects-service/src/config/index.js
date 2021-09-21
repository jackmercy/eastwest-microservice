const { initDI } = require('./di');
const database = require('./db');
const settings = require('./config');
const models = require('../models');
const utils = require('../utils');
const services = require('../services');
const constants = require('../constants');

const init = initDI.bind(null, {
  settings,
  database,
  models,
  services,
  utils,
  constants,
});

module.exports = Object.assign({}, { init });
