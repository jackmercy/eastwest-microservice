const mongoose = require('mongoose');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateEmail = (email) => emailRegex.test(email);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [emailRegex, 'Please fill a valid email address'],
    },
    password: { type: String, required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  },
  { timestamps: true },
);

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.password;
    delete obj.__v;
  },
});

module.exports = mongoose.model('User', userSchema, 'users');
