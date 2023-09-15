const mongoose = require('mongoose');

const uploadImagesSchema = new mongoose.Schema({
  chestXRay: { type: String, required: true },
  ctScanReport: { type: String, required: true },
  bloodReport: { type: String, required: true },
});

const UploadImages = mongoose.model('UploadImages', uploadImagesSchema);

module.exports = UploadImages;
