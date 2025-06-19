const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const placementPolicySchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  image: { type: String, required: true }, // filename or URL
  highlights: [highlightSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = placementPolicySchema;
