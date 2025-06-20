const mongoose = require('mongoose');

const contactDetailsSchema = new mongoose.Schema({
  address: { type: String, required: true },
  email: { type: String, required: true },
  phones: [{ type: String, required: true }]
}, { timestamps: true });

module.exports = contactDetailsSchema;
