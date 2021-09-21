const mongoose = require('mongoose');

// DO NOT REMOVE
// Only used for quering
// Using for dynamic query in repository.js
const communityMemberSchema = new mongoose.Schema({
  emailAddress: { type: String },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
});

communityMemberSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model(
  'CommunityMember',
  communityMemberSchema,
  'communityMembers',
);
