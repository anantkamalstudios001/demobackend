const sportsDataSchema = require('../../models/centralAdmin/sportsData.model');

exports.addSportsData = async (req, res) => {
  try {
    const SportsData = req.db.model('SportsData', sportsDataSchema);
    const saved = await new SportsData(req.body).save();
    res.status(201).json({ status: true, message: 'Sports data saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getSportsData = async (req, res) => {
  try {
    const SportsData = req.db.model('SportsData', sportsDataSchema);
    const data = await SportsData.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateSportsData = async (req, res) => {
  try {
    const SportsData = req.db.model('SportsData', sportsDataSchema);
    const updated = await SportsData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Sports data updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteSportsData = async (req, res) => {
  try {
    const SportsData = req.db.model('SportsData', sportsDataSchema);
    await SportsData.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Sports data deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
