const jwtSettings = {
  secret: 'sixbrI5tCApbyQayOc8438sy3QUlUuvNqrTs2Dh11eCp57kRF22L8hXshJ1wSj0g',
  expiresIn: 24 * 60 * 60, // 24hrs
  expiresInRemembered: 30 * 24 * 60 * 60, // 30days
};

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

module.exports = Object.assign({}, { jwtSettings, dbSettings, serverSettings });
