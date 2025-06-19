const mongoose = require('mongoose');

const academicCalendarSchema = new mongoose.Schema({
  icon: String,
  heading: String,
  paragraph: String,
  pdf: String, // File path
  createdAt: { type: Date, default: Date.now }
});

module.exports = academicCalendarSchema;
