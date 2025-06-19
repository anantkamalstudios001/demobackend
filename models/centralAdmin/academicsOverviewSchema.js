// models/collegeAdmin/academicsOverviewSchema.js
const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  paragraph: { type: String }
});

const facultySchema = new mongoose.Schema({
  icon: { type: String, required: true },
  heading: { type: String, required: true },
  paragraph: { type: String, required: true }
});

const highlightSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true }
});

const academicsOverviewSchema = new mongoose.Schema({
  about: { type: String },
  programs: [programSchema],
  faculties: [facultySchema],
  highlights: [highlightSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = academicsOverviewSchema;
