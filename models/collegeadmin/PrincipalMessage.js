const mongoose = require('mongoose');

const principalMessageSchema = new mongoose.Schema({
  title: { type: String },
  principalName: { type: String },
  designation: { type: String, },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PrincipalMessage', principalMessageSchema);
