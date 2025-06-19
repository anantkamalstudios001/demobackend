const mongoose = require('mongoose');

const centralContactUsSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
}, { timestamps: true });

module.exports = centralContactUsSchema;
