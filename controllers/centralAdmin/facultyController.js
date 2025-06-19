const facultySchema = require('../../models/centralAdmin/Faculty');

// Add Faculty
exports.addFaculty = async (req, res) => {
  try {
    const Faculty = req.db.model('Faculty', facultySchema);
    const { facultyName, jobTitle, twitterLink, facebookLink, instagramLink, linkedinLink } = req.body;
    const image = req.file ? req.file.path : '';

    const newFaculty = new Faculty({
      facultyName,
      jobTitle,
      twitterLink,
      facebookLink,
      instagramLink,
      linkedinLink,
      image,
    });

    await newFaculty.save();

    res.status(201).json({
      status: true,
      message: 'Faculty added successfully',
      data: newFaculty,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add faculty',
      error: error.message,
    });
  }
};

// Get all Faculties
exports.getFaculties = async (req, res) => {
  try {
    const Faculty = req.db.model('Faculty', facultySchema);
    const faculties = await Faculty.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Faculties fetched successfully',
      data: faculties,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch faculties',
      error: error.message,
    });
  }
};

// Update Faculty
exports.updateFaculty = async (req, res) => {
  try {
    const Faculty = req.db.model('Faculty', facultySchema);
    const { id } = req.params;

    const updateData = {
      facultyName: req.body.facultyName,
      jobTitle: req.body.jobTitle,
      twitterLink: req.body.twitterLink,
      facebookLink: req.body.facebookLink,
      instagramLink: req.body.instagramLink,
      linkedinLink: req.body.linkedinLink,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Faculty.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
      status: true,
      message: 'Faculty updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update faculty',
      error: error.message,
    });
  }
};

// Delete Faculty
exports.deleteFaculty = async (req, res) => {
  try {
    const Faculty = req.db.model('Faculty', facultySchema);
    const { id } = req.params;

    await Faculty.findByIdAndDelete(id);

    res.json({
      status: true,
      message: 'Faculty deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete faculty',
      error: error.message,
    });
  }
};
