const achievementCardSchema = require('../../models/centralAdmin/achievementCard.model');

exports.addAchievementCard = async (req, res) => {
  try {
    const AchievementCard = req.db.model('AchievementCard', achievementCardSchema);
    const saved = await new AchievementCard(req.body).save();
    res.status(201).json({ status: true, message: 'Achievement card added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

exports.getAchievementCards = async (req, res) => {
  try {
    const AchievementCard = req.db.model('AchievementCard', achievementCardSchema);
    const data = await AchievementCard.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateAchievementCard = async (req, res) => {
  try {
    const AchievementCard = req.db.model('AchievementCard', achievementCardSchema);
    const updated = await AchievementCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Achievement card updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteAchievementCard = async (req, res) => {
  try {
    const AchievementCard = req.db.model('AchievementCard', achievementCardSchema);
    await AchievementCard.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Achievement card deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
