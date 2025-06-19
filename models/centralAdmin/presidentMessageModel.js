const mongoose = require('mongoose');

const altPresidentMessageSchema = new mongoose.Schema({
  paragraph1: String,
paragraph2: String,
  presidentName: String,
  image: String,
  biographyParagraphs: [String],
  visionParagraphs: [String],
}, { timestamps: true });

module.exports = altPresidentMessageSchema;
