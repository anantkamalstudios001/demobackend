const mongoose = require('mongoose');

const homeServiceSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  icon: { type: String, required: true },       // e.g., "fa-user", "fa-cog"
  paragraph: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_HomeService', homeServiceSchema);
