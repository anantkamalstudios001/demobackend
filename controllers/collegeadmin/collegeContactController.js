const getModelByDepartment = require('../../utils/getModelByDepartment');

exports.addCollegeContact = async (req, res) => {
  try {
    const department = req.headers['x-department'];
    if (!department) {
      return res.status(400).json({ message: 'Missing department header' });
    }

    const {
      collegeName, email, phone, altPhone, website,
      address, city, state, zip, country, mapLocation
    } = req.body;

    const CollegeContactModel = getModelByDepartment(department, 'college_contact');

    const contact = new CollegeContactModel({
      collegeName, email, phone, altPhone, website,
      address, city, state, zip, country, mapLocation
    });

    await contact.save();
    res.status(201).json({ message: `${department} contact info saved`, contact });

  } catch (error) {
    console.error('Error saving contact info:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
