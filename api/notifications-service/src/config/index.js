const { initDI } = require('./di');
const settings = require('./config');
const models = require('../models');
const templates = require('../templates');
const utils = require('../utils');
const services = require('../services');

const init = initDI.bind(null, {
  settings,
  models,
  services,
  templates,
  utils,
});

module.exports = Object.assign({}, { init });
