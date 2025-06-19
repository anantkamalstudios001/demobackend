const mongoose = require('mongoose');

const eligibilitySchema = new mongoose.Schema({
  school: { type: String, required: true },
  program: { type: String, required: true },
  criteria: { type: String, required: true },
  reference: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = eligibilitySchema; // only export schema (not model) for dynamic DB usage
