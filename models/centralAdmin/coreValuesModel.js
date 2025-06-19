const mongoose = require('mongoose');

const coreValuesSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true }
}, { timestamps: true });

module.exports = coreValuesSchema;
