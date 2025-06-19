const mongoose = require('mongoose');

const campusGallerySchema = new mongoose.Schema({
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = campusGallerySchema;
