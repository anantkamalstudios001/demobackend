const mongoose = require('mongoose');

const altPresidentMessageSchema = new mongoose.Schema({
  heading: String,
  presidentName: String,
  image: String,
  biographyParagraphs: [String],
  visionParagraphs: [String]
});

module.exports = mongoose.model('central_about_president', altPresidentMessageSchema);
