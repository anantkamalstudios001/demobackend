const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  paragraph: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_Placement_paragraph', placementSchema);
