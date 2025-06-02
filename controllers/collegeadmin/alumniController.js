const getModelByDepartment = require('../../utils/getModelByDepartment');

exports.addAlumni = async (req, res) => {
  try {
    const department = req.headers['x-department'];
    if (!department) {
      return res.status(400).json({ message: 'Missing department header' });
    }

    const {
      fullName, email, phone, course,
      passingYear, currentOccupation, location
    } = req.body;

    const AlumniModel = getModelByDepartment(department, 'alumni');

    const alumni = new AlumniModel({
      fullName,
      email,
      phone,
      course,
      passingYear,
      currentOccupation,
      location
    });

    await alumni.save();
    res.status(201).json({ message: `${department} alumni added`, alumni });

  } catch (error) {
    console.error('Error adding alumni:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
