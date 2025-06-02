const mongoose = require('mongoose');

const governingBodySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  details: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('GoverningBody', governingBodySchema);
