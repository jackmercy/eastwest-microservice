const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunityMember',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['create', 'read', 'update', 'delete'],
    },
    description: { type: String, required: true },
    resource: { type: String, required: true },
    resourceId: { type: String, required: true },
  },
  { timestamps: true },
);

activitySchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model(
  'Activity',
  activitySchema,
  'communityMemberActivities',
);
