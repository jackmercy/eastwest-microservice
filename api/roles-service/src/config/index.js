const { initDI } = require('./di');
const settings = require('./config');
const database = require('./db');
const models = require('../models');
const utils = require('../utils');
const services = require('../services');
const constants = require('../constants');

const init = initDI.bind(null, {
  settings,
  database,
  services,
  models,
  utils,
  constants,
});

module.exports = Object.assign({}, { init });
