const mongoose = require('mongoose');

const imageCaptionSchema = new mongoose.Schema({
  image: { type: String, required: true },     // Image filename or path
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = imageCaptionSchema;
