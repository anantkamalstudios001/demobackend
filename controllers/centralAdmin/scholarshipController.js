const scholarshipSchema = require('../../models/centralAdmin/scholarship.model');

exports.addScholarship = async (req, res) => {
  try {
    const Scholarship = req.db.model('Scholarship', scholarshipSchema);
    const { category, icon, title, eligibility, benefits, application } = req.body;
    const newScholarship = new Scholarship({ category, icon, title, eligibility, benefits, application });
    const saved = await newScholarship.save();
    res.status(201).json({ status: true, message: 'Scholarship saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getScholarships = async (req, res) => {
  try {
    const Scholarship = req.db.model('Scholarship', scholarshipSchema);
    const allScholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: allScholarships });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const Scholarship = req.db.model('Scholarship', scholarshipSchema);
    const updated = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Scholarship updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteScholarship = async (req, res) => {
  try {
    const Scholarship = req.db.model('Scholarship', scholarshipSchema);
    await Scholarship.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Scholarship deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
