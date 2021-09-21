const mongoose = require('mongoose');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateEmail = (email) => emailRegex.test(email);

// Only used for populating
const communityMemberSchema = new mongoose.Schema({});

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
