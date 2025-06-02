const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const missionVisionSchema = new mongoose.Schema({
  mission: [itemSchema],
  vision: [itemSchema],
}, { timestamps: true });

module.exports = mongoose.model('MissionVision', missionVisionSchema);
