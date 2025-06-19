// models/corporateTieups.model.js
const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logo: { type: String, required: true }
});

const corporateTieupsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  bannerImage: { type: String, required: true },
  partners: [partnerSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = corporateTieupsSchema;
