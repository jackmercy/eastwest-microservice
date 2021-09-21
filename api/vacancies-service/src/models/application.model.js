const mongoose = require('mongoose');

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validateEmail = (email) => emailRegex.test(email);

const applicationSchema = new mongoose.Schema(
  {
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    },
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
    knownFrom: { type: String, required: true },
    resumes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
    ],
    vacancy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy' },
    address: String,
    linkedinProfile: String,
  },
  { timestamps: true },
);

applicationSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model(
  'Application',
  applicationSchema,
  'vacancyApplications',
);
