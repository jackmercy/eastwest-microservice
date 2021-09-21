const mongoose = require('mongoose');

// Schema defined in users service
const userSchema = new mongoose.Schema({
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
});

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('User', userSchema, 'users');
