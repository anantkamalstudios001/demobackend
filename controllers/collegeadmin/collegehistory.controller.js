const History = require('../../models/collegeadmin/collgeHistory');

exports.createHistory = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newHistory = new History({ title, content });
    await newHistory.save();

    res.status(201).json({ message: 'History added', data: newHistory });
  } catch (error) {
    console.error('Error creating history:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};
