const mongoose = require('mongoose');

const facilityGallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = facilityGallerySchema;
