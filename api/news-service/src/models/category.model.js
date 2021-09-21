const mongoose = require('mongoose');

const slugRegex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/i;

const validateSlug = (slug) => slugRegex.test(slug);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate: [
        validateSlug,
        'Please fill a valid slug. Slug only contains alphabet, number and hyphen',
      ],
      match: [
        slugRegex,
        'Please fill a valid slug. Slug only contains alphabet, number and hyphen',
      ],
    },
    shortDescription: { type: String, required: true },
    language: { type: String, lowercase: true, enum: ['en'], default: 'en' },
    tags: [{ type: String }],
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

module.exports = mongoose.model('Category', categorySchema, 'newsCategories');
