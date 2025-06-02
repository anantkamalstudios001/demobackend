const mongoose = require('mongoose');

const centralContactUsSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model('central_contact_us_queries', centralContactUsSchema, 'central_contact_us_queries');
