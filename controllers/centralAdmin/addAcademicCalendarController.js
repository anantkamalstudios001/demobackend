const addAcademicCalendar = async (req, res) => {
  try {
    const AcademicCalendar = req.db.model('AcademicCalendar', require('../../models/centralAdmin/academicCalendarSchema'));
    const { icon, heading, paragraph } = req.body;
    const pdf = req.file ? req.file.path : null;

    const newEntry = new AcademicCalendar({ icon, heading, paragraph, pdf });
    const saved = await newEntry.save();

    res.status(201).json({ status: true, message: 'Academic Calendar saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to save', error: err.message });
  }
};

const getAcademicCalendars = async (req, res) => {
  try {
    const AcademicCalendar = req.db.model('AcademicCalendar', require('../../models/centralAdmin/academicCalendarSchema'));
    const data = await AcademicCalendar.find().sort({ createdAt: -1 });
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch', error: err.message });
  }
};

const updateAcademicCalendar = async (req, res) => {
  try {
    const AcademicCalendar = req.db.model('AcademicCalendar', require('../../models/centralAdmin/academicCalendarSchema'));
    const { id } = req.params;
    const { icon, heading, paragraph } = req.body;

    const update = { icon, heading, paragraph };
    if (req.file) update.pdf = req.file.path;

    const updated = await AcademicCalendar.findByIdAndUpdate(id, update, { new: true });
    res.json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update', error: err.message });
  }
};

const deleteAcademicCalendar = async (req, res) => {
  try {
    const AcademicCalendar = req.db.model('AcademicCalendar', require('../../models/centralAdmin/academicCalendarSchema'));
    const { id } = req.params;

    await AcademicCalendar.findByIdAndDelete(id);
    res.json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete', error: err.message });
  }
};

module.exports = {
  addAcademicCalendar,
  getAcademicCalendars,
  updateAcademicCalendar,
  deleteAcademicCalendar
};
