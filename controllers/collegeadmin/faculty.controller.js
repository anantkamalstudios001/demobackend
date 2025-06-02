const getModelByDepartment = require('../../utils/getFacultyModelByDepartment');

exports.addFaculty = async (req, res) => {
  try {
    const { name, designation, department, qualification, experience, isActive } = req.body;

    const FacultyModel = getModelByDepartment(department);

    const newFaculty = new FacultyModel({
      name,
      designation,
      department,
      qualification,
      experience,
      isActive
    });

    await newFaculty.save();

    res.status(201).json({ message: `${department} faculty member added`, faculty: newFaculty });
  } catch (error) {
    res.status(500).json({ message: 'Error adding faculty member', error });
  }
};
