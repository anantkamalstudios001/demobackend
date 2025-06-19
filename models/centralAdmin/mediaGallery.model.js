const mongoose = require('mongoose');

const mediaGallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mediaGallerySchema;
