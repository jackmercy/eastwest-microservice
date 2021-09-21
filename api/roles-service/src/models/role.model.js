const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    alias: { type: String, required: true, lowercase: true, unique: true },
    priority: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  },
  { timestamps: true },
);

roleSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Role', roleSchema, 'roles');
