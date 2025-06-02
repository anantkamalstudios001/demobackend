const GoverningBody = require('../../models/collegeadmin/GoverningBody');

exports.createGoverningBody = async (req, res) => {
  try {
    const { name,designation,details } = req.body;

    const newBody = new GoverningBody({ name,designation,details });
    await newBody.save();

    res.status(201).json({ message: 'Governing body info added', data: newBody });
  } catch (error) {
    console.error('Error adding governing body info:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
