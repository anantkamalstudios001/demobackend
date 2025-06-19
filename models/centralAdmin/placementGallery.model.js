const mongoose = require('mongoose');

const placementGallerySchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  images: [{ type: String, required: true }], // array of image filenames or URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = placementGallerySchema;
