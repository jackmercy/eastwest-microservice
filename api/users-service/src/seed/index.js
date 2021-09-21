const mongoose = require('mongoose');
const { dbSettings } = require('../config/config');

const seedUsers = require('./users.seed');

const getMongoURL = (options) =>
  `mongodb://${options.host}:${options.port}/${options.db}`;

const connectDb = async (options) => {
  await mongoose.connect(getMongoURL(options), {
    user: options.user,
    pass: options.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  return mongoose.connection;
};

(async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('YOU ARE RUNNING SEED ON PRODUCTION');
      console.log('MAKE SURE YOU KNOWN WHAT YOU ARE DOING');
      return;
    }

    console.log('Connecting to mongodb...');
    await connectDb(dbSettings);
    console.log('Connected to mongodb');

    /**============================== */

    // Currently we only allow drop collection manually
    // console.log('Droping Users collection');
    // await mongoose.connection.db.dropCollection('users');

    /**============================== */

    await seedUsers();
  } catch (error) {
    console.log('Run seed failed!');
    console.log(error);
  } finally {
    process.exit();
  }
})();
