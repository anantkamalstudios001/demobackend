const CentralContactUsModel = require('../../models/centralAdmin/centralContactUsModel');

exports.addContactQuery = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newQuery = new CentralContactUsModel({
      name,
      email,
      subject,
      message
    });

    await newQuery.save();

    res.status(201).json({ status: true, message: 'submitted successfully', query: newQuery });
  } catch (error) {
    console.error('Error saving contact query:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.getContactQueries = async (req, res) => {
  try {
    const queries = await CentralContactUsModel.find().sort({ createdAt: -1 });
    res.status(200).json({ queries });
  } catch (error) {
    console.error('Error fetching contact queries:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
