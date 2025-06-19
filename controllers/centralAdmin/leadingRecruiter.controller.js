const leadingRecruiterSchema = require('../../models/centralAdmin/leadingRecruiter.model');

// Create
exports.addLeadingRecruiter = async (req, res) => {
  try {
    const LeadingRecruiter = req.db.model('LeadingRecruiter', leadingRecruiterSchema);
    const logo = req.file?.filename;

    if (!logo) return res.status(400).json({ status: false, message: 'Logo is required' });

    const saved = await new LeadingRecruiter({ logo }).save();
    res.status(201).json({ status: true, message: 'Recruiter added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

// Get All
exports.getLeadingRecruiters = async (req, res) => {
  try {
    const LeadingRecruiter = req.db.model('LeadingRecruiter', leadingRecruiterSchema);
    const data = await LeadingRecruiter.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

// Update
exports.updateLeadingRecruiter = async (req, res) => {
  try {
    const LeadingRecruiter = req.db.model('LeadingRecruiter', leadingRecruiterSchema);
    const logo = req.file?.filename;

    if (!logo) return res.status(400).json({ status: false, message: 'Logo is required' });

    const updated = await LeadingRecruiter.findByIdAndUpdate(
      req.params.id,
      { logo },
      { new: true }
    );

    res.json({ status: true, message: 'Recruiter updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

// Delete
exports.deleteLeadingRecruiter = async (req, res) => {
  try {
    const LeadingRecruiter = req.db.model('LeadingRecruiter', leadingRecruiterSchema);
    await LeadingRecruiter.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Recruiter deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
