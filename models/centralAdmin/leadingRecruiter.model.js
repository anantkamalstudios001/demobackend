const mongoose = require('mongoose');

const leadingRecruiterSchema = new mongoose.Schema({
  logo: { type: String, required: true }, // logo filename
  createdAt: { type: Date, default: Date.now }
});

module.exports = leadingRecruiterSchema;
