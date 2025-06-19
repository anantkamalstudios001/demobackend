const mongoose = require('mongoose');

const whyWeAreSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = whyWeAreSchema;
