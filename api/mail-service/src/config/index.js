const { initDI } = require('./di');
const settings = require('./config');
const models = require('../models');
const utils = require('../utils');

const init = initDI.bind(null, { settings, models, utils });

module.exports = Object.assign({}, { init });
