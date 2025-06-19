const visionMissionSchema = require('../../models/centralAdmin/visionMissionModel');

exports.addVisionMission = async (req, res) => {
  try {
    const VisionMission = req.db.model('VisionMission', visionMissionSchema);

    const existing = await VisionMission.findOne();
    if (existing) {
      return res.status(400).json({ status: false, message: 'Only one Vision & Mission entry allowed' });
    }

    const { vision, mission } = req.body;
    const newEntry = new VisionMission({ vision, mission });
    await newEntry.save();

    res.json({ status: true, message: 'Vision & Mission added', data: newEntry });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.getVisionMission = async (req, res) => {
  try {
    const VisionMission = req.db.model('VisionMission', visionMissionSchema);
    const data = await VisionMission.find().sort({ createdAt: -1 }).limit(1);
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.updateVisionMission = async (req, res) => {
  try {
    const VisionMission = req.db.model('VisionMission', visionMissionSchema);
    const updated = await VisionMission.findByIdAndUpdate(
      req.params.id,
      { vision: req.body.vision, mission: req.body.mission },
      { new: true }
    );

    res.json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteVisionMission = async (req, res) => {
  try {
    const VisionMission = req.db.model('VisionMission', visionMissionSchema);
    await VisionMission.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
