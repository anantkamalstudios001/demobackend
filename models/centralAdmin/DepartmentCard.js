const mongoose = require('mongoose');

const departmentCardSchema = new mongoose.Schema({
  department: { type: String, required: true },
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  applyLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = departmentCardSchema;
