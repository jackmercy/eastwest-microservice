const mongoose = require('mongoose');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateEmail = (email) => emailRegex.test(email);

// Model used for News comments logged in with social account
const communityMemberSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, required: true },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [emailRegex, 'Please fill a valid email address'],
    },
    status: {
      type: String,
      // Check logic in repository if change something here
      enum: ['active', 'banned'],
      default: 'active',
    },
    socialId: { type: String, required: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  },
  { timestamps: true },
);

communityMemberSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.token;
    delete obj.__v;
  },
});

module.exports = mongoose.model(
  'CommunityMember',
  communityMemberSchema,
  'communityMembers',
);
