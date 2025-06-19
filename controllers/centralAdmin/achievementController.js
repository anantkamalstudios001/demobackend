const achievementSchema = require('../../models/centralAdmin/achievement.model');

exports.addAchievement = async (req, res) => {
  try {
    const Achievement = req.db.model('Achievement', achievementSchema);
    const saved = await new Achievement(req.body).save();
    res.status(201).json({ status: true, message: 'Achievement added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const Achievement = req.db.model('Achievement', achievementSchema);
    const data = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const Achievement = req.db.model('Achievement', achievementSchema);
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Achievement updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const Achievement = req.db.model('Achievement', achievementSchema);
    await Achievement.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
