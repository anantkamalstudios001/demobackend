const mongoose = require('mongoose');

const approvalSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = approvalSchema;
