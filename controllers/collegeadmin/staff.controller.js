const getModelByDepartment = require('../../utils/getModelByDepartment');



exports.addStaff = async (req, res) => {
  try {
    const {
      first, last, gender, mobile, password, conformPassword,
      designation, address, email, dob, education, department_name
    } = req.body;

    const file = req.file ? req.file.filename : null;

    // ✅ Fix: Read correct header name
    const department = req.headers['x-department'];

    if (!department) {
      return res.status(400).json({ message: 'Department header missing' });
    }

    const StaffModel = getModelByDepartment(department);

    const newStaff = new StaffModel({
      first, last, gender, mobile, password, conformPassword,
      designation, address, email, dob, education, department_name,
      filePath: file
    });

    await newStaff.save();

    res.status(201).json({ message: `${department} staff added successfully`, staff: newStaff });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error adding staff', error });
  }
};
