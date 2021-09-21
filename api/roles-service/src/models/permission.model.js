const mongoose = require('mongoose');

/**
 * Models built based on accesscontrol ideas.
 * Accesscontrol will be used to verify user has access control or not
 * Read more: https://www.npmjs.com/package/accesscontrol
 */

const permissionSchema = new mongoose.Schema(
  {
    /** Identify permission, Prevent duplicate */
    shortDes: { type: String, required: true, unique: true },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    /** Model name */
    resource: { type: String, required: true },
    /** Actions built based on CRUD, RESTful */
    action: {
      type: String,
      required: true,
      enum: ['create', 'read', 'update', 'delete'],
    },
    scope: {
      type: String,
      required: true,
      enum: ['any', 'own'],
    },
  },
  { timestamps: true },
);

permissionSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Permission', permissionSchema, 'permissions');
