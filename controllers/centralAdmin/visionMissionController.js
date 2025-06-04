const VisionMission = require('../../models/centralAdmin/visionMissionModel');

exports.addVisionMission = async (req, res) => {
  try {
    const { vision, mission } = req.body;
    const data = new VisionMission({ vision, mission });
    await data.save();
    res.json({ status: true, message: 'Vision & Mission added', data });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.getVisionMission = async (req, res) => {
  try {
    const data = await VisionMission.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.updateVisionMission = async (req, res) => {
  try {
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
    await VisionMission.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
