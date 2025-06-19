const mongoose = require('mongoose');

const holidayListSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  day: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  notes: { type: String, required: true }
}, { timestamps: true });

module.exports = holidayListSchema;
