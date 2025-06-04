const mongoose = require('mongoose');

const visionMissionSchema = new mongoose.Schema({
  vision: {
    title: { type: String, required: true },
    paragraph: { type: String, required: true }
  },
  mission: [
    { type: String, required: true }
  ]
}, { timestamps: true });

module.exports = mongoose.model('central_VisionMission', visionMissionSchema);
