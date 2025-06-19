const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course: { type: String, required: true },
  duration: { type: String, required: true },
  tuitionFee: { type: String, required: true },
  examFee: { type: String, required: true },
  totalFee: { type: String, required: true }
});

const feeStructureSchema = new mongoose.Schema({
  ugCourses: [courseSchema],
  pgCourses: [courseSchema],
  notes: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = feeStructureSchema;
