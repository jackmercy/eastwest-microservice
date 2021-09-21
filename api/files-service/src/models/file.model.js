const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    uploadName: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    public: { type: Boolean, default: false },
    // We are using google drive to store file
    // Storage gg drive id to retrive the file
    googleDriveId: { type: String, required: true },
  },
  { timestamps: true },
);

fileSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model('File', fileSchema, 'files');
