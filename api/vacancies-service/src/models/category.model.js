const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    language: { type: String, lowercase: true, enum: ['en'], default: 'en' },
  },
  { timestamps: true },
);

categorySchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Category', categorySchema, 'vacancyCategories');
