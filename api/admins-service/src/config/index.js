const { initDI } = require('./di');
const settings = require('./config');
const services = require('../services');
const utils = require('../utils');
const constants = require('../constants');

const init = initDI.bind(null, { settings, services, utils, constants });

module.exports = Object.assign({}, { init });
