const mongoose = require('mongoose');

const placementImageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // stores file path like 'uploads/placementImages/12345.jpg'
}, { timestamps: true });

module.exports = mongoose.model('central_PlacementImage', placementImageSchema);
