const dbSettings = {
  db: process.env.MONGO_DB || 'admin',
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  user: process.env.MONGO_USER || 'admin',
  pass: process.env.MONGO_PASSWORD || 123,
};

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl'),
};

module.exports = Object.assign({}, { dbSettings, serverSettings });
