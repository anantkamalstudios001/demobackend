const eligibilitySchema = require('../../models/centralAdmin/eligibility.model');

exports.addEligibility = async (req, res) => {
  try {
    const Eligibility = req.db.model('Eligibility', eligibilitySchema);
    const { school, program, criteria, reference } = req.body;
    const newEntry = new Eligibility({ school, program, criteria, reference });
    const saved = await newEntry.save();
    res.status(201).json({ status: true, message: 'Eligibility saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to save', error: err.message });
  }
};

exports.getEligibilities = async (req, res) => {
  try {
    const Eligibility = req.db.model('Eligibility', eligibilitySchema);
    const entries = await Eligibility.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: entries });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch', error: err.message });
  }
};

exports.updateEligibility = async (req, res) => {
  try {
    const Eligibility = req.db.model('Eligibility', eligibilitySchema);
    const updated = await Eligibility.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Eligibility updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteEligibility = async (req, res) => {
  try {
    const Eligibility = req.db.model('Eligibility', eligibilitySchema);
    await Eligibility.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Eligibility deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
