const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  name: { type: String, required: true },
  roleOrDept: { type: String, required: true },
});

const committeeSchema = new mongoose.Schema({
  committeeDesignation: { type: String, required: true },
  members: [memberSchema],
}, { timestamps: true });

module.exports = committeeSchema;
