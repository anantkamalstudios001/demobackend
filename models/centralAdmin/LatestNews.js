const mongoose = require('mongoose');

const latestNewsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  link: { type: String }
}, { timestamps: true });

module.exports = latestNewsSchema;
