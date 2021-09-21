const mongoose = require('mongoose');

const slugRegex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/i;

const validateSlug = (slug) => slugRegex.test(slug);

const vacancySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    htmlContent: { type: String, required: true },
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'onsite', 'freelance'],
      default: 'full-time',
    },
    status: {
      type: String,
      enum: ['public', 'draft'],
      default: 'public',
    },
    language: { type: String, lowercase: true, enum: ['en'], default: 'en' },
    viewed: { type: Number, default: 0 },
    shortDescription: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

vacancySchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Vacancy', vacancySchema, 'vacancies');
