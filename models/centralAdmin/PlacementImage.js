const mongoose = require('mongoose');

const placementImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = placementImageSchema;
