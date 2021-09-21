const mailSettings = {
  sender: 'East West <no-reply@eastwest.live>',
  domain: process.env.MAILGUN_DOMAIN,
  apiKey: process.env.MAILGUN_SECRET,
};

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl'),
};

module.exports = Object.assign({}, { mailSettings, serverSettings });
