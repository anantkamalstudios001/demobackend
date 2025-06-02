const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  image: { type: String, required: true },
  paragraphs: { type: [String], required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_about', aboutSchema);
