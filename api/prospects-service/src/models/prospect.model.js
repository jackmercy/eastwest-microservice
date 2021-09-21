const mongoose = require('mongoose');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateEmail = (email) => emailRegex.test(email);

const prospectSchema = new mongoose.Schema(
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
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    country: { type: String, required: true },
    description: String,
  },
  { timestamps: true },
);

prospectSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('Prospect', prospectSchema, 'prospects');
