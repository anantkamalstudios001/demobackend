const mongoose = require('mongoose');

const sportsFacilitySchema = new mongoose.Schema({
  heading: { type: String, required: true },
  points: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = sportsFacilitySchema;
