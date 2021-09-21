const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    },
  },
  { timestamps: true },
);

authorSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Author', authorSchema, 'newsAuthors');
