const centralContactUsSchema = require('../../models/centralAdmin/centralContactUsModel');

// ADD CONTACT QUERY
exports.addContactQuery = async (req, res) => {
  try {
    const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    const newQuery = new ContactUs({ name, email, subject, message });
    await newQuery.save();

    res.status(201).json({ status: true, message: 'Submitted successfully', data: newQuery });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};

// GET ALL QUERIES
exports.getContactQueries = async (req, res) => {
  try {
    const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
    const queries = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, message: 'Fetched successfully', data: queries });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};

// DELETE QUERY
exports.deleteContactQuery = async (req, res) => {
  try {
    const ContactUs = req.db.model('ContactUs', centralContactUsSchema);
    const deleted = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Query not found' });
    }
    res.status(200).json({ status: true, message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error: error.message });
  }
};
