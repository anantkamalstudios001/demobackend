const mongoose = require('mongoose');

const placementOverviewSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  buttonText: { type: String },
  buttonLink: { type: String },
  points: [{ type: String }],
  image: { type: String }, // store filename or URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = placementOverviewSchema;
