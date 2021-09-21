const mongoose = require('mongoose');

// Only used for populating
const roleSchema = new mongoose.Schema({});

roleSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Role', roleSchema, 'roles');
