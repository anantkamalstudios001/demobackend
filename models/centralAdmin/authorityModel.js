const mongoose = require('mongoose');

const authoritySchema = new mongoose.Schema({
  approvalType: { type: String, required: true },
  authority: { type: String, required: true },
  programsCovered: { type: String, required: true },
  validUntil: { type: String, required: true },
}, { timestamps: true });

module.exports = authoritySchema;
