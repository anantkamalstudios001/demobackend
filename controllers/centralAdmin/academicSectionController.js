const academicSectionSchema = require('../../models/centralAdmin/academicSection.model');

exports.addAcademicSection = async (req, res) => {
  try {
    const AcademicSection = req.db.model('AcademicSection', academicSectionSchema);
    const { category, title, description, icon } = req.body;
    const newSection = new AcademicSection({ category, title, description, icon });
    const saved = await newSection.save();
    res.status(201).json({ status: true, message: 'Saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getAcademicSections = async (req, res) => {
  try {
    const AcademicSection = req.db.model('AcademicSection', academicSectionSchema);
    const allSections = await AcademicSection.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: allSections });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateAcademicSection = async (req, res) => {
  try {
    const AcademicSection = req.db.model('AcademicSection', academicSectionSchema);
    const updated = await AcademicSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ status: true, message: 'Updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteAcademicSection = async (req, res) => {
  try {
    const AcademicSection = req.db.model('AcademicSection', academicSectionSchema);
    await AcademicSection.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};

