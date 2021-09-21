const mongoose = require('mongoose');

const slugRegex = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/i;

const validateSlug = (slug) => slugRegex.test(slug);

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
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
    status: {
      type: String,
      enum: ['public', 'draft'],
      default: 'public',
    },
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    },
    language: { type: String, lowercase: true, enum: ['en'], default: 'en' },
    shortDescription: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    tags: [{ type: String }],
    // User allows comment that news or not
    commentAllowed: { type: Boolean, default: true },
    // Auto approved or need approval before publish
    commentNeedApproved: { type: Boolean, default: true },
  },
  { timestamps: true },
);

NewsSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('News', NewsSchema, 'news');
