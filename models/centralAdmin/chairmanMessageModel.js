const mongoose = require('mongoose');

const chairmanMessageSchema = new mongoose.Schema({
  paragraph1: String,
  paragraph2: String,
  chairmansName: String,
  image: String,
  biographyParagraphs: [String],
  visionParagraphs: [String],
}, { timestamps: true });

module.exports = chairmanMessageSchema;
