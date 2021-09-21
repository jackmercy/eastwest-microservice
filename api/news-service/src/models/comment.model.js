const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunityMember',
      required: true,
    },
    news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
    comment: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityMember' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: true },
);

commentSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema, 'newsComments');
