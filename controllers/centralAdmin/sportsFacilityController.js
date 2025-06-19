const sportsFacilitySchema = require('../../models/centralAdmin/sportsFacility.model');

exports.addSportsFacility = async (req, res) => {
  try {
    const SportsFacility = req.db.model('SportsFacility', sportsFacilitySchema);
    const saved = await new SportsFacility(req.body).save();
    res.status(201).json({ status: true, message: 'Sports facility data saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getSportsFacilities = async (req, res) => {
  try {
    const SportsFacility = req.db.model('SportsFacility', sportsFacilitySchema);
    const data = await SportsFacility.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateSportsFacility = async (req, res) => {
  try {
    const SportsFacility = req.db.model('SportsFacility', sportsFacilitySchema);
    const updated = await SportsFacility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteSportsFacility = async (req, res) => {
  try {
    const SportsFacility = req.db.model('SportsFacility', sportsFacilitySchema);
    await SportsFacility.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
