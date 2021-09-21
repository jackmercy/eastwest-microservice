const { initDI } = require('./di');
const database = require('./db');
const settings = require('./config');
const models = require('../models');
const services = require('../services');
const utils = require('../utils');

const init = initDI.bind(null, { settings, database, models, services, utils });

module.exports = Object.assign({}, { init });
