const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  logo: { type: String, required: true }  // Path to logo image
}, { timestamps: true });

module.exports = logoSchema;
