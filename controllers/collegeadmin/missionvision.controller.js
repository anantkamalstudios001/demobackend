const MissionVision = require('../../models/collegeadmin/MissionVision');

exports.createMissionVision = async (req, res) => {
  try {
    const { mission, vision } = req.body;

    const mv = new MissionVision({
      mission,
      vision
    });

    await mv.save();

    res.status(201).json({ message: 'Mission & Vision saved', data: mv });
  } catch (err) {
    console.error('Error saving mission & vision:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
