const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  application: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = scholarshipSchema;
