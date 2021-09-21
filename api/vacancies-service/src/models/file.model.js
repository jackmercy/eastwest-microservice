const mongoose = require('mongoose');

// Only used for populating
const fileSchema = new mongoose.Schema({});

fileSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('File', fileSchema, 'files');
