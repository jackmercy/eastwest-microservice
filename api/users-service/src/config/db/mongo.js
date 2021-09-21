const mongoose = require('mongoose');

const getMongoURL = (options) =>
  `mongodb://${options.host}:${options.port}/${options.db}`;

const connectDb = async (options) => {
  await mongoose.connect(getMongoURL(options), {
    user: options.user,
    pass: options.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  return mongoose.connection;
};

const connect = (options, mediator) => {
  mediator.once('boot.ready', async () => {
    try {
      const db = await connectDb(options);

      mediator.emit('db.ready', db);
    } catch (error) {
      mediator.emit('db.error', error);
    }
  });
};

module.exports = Object.assign({}, { connect });
