const mongoose = require('mongoose');

const homeServiceSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  icon: { type: String, required: true },
  paragraph: { type: String, required: true },
}, { timestamps: true });

module.exports = homeServiceSchema;
