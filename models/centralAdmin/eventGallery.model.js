const mongoose = require('mongoose');

const eventGallerySchema = new mongoose.Schema({
  image: { type: String, required: true }, // stores image filename
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = eventGallerySchema;
