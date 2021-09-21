const mongoose = require('mongoose');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

var validateEmail = (email) => emailRegex.test(email);

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [emailRegex, 'Please fill a valid email address'],
    },
    phoneNumber: { type: String, trim: true, required: true },
    reason: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

contactSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema, 'contacts');
