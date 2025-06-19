const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  label: { type: String, required: true },
  number: { type: Number, required: true },
  sign: { type: String, required: true },
}, { timestamps: true });

module.exports = placementSchema;
