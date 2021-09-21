const smsService = require('./sms.service');
const mailService = require('./mail.service');
const webpushService = require('./webpush.service');

module.exports = Object.assign({}, { smsService, mailService, webpushService });
