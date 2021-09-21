const mongoose = require('mongoose');

// DO NOT REMOVE
// Only used for quering
// Using for dynamic query in models/role.model.js
const permissionSchema = new mongoose.Schema({});

permissionSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Permission', permissionSchema, 'permissions');
