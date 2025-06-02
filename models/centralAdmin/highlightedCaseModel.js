const mongoose = require('mongoose');

const highlightedCaseSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_HighlightedCase', highlightedCaseSchema);
