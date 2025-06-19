const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  purpose: { type: String, required: true },
  signedDate: { type: Date, required: true },
  focusArea: { type: String, required: true }
});

const mouSchema = new mongoose.Schema({
  introParagraph: { type: String, required: true },
  sections: [sectionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mouSchema;
