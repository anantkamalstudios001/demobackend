const Faculty = require('../../models/centralAdmin/Faculty');

exports.addFaculty = async (req, res) => {
  try {
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
    console.error('Error adding faculty:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add faculty',
      error: error.message,
    });
  }
};

exports.getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Faculties fetched successfully',
      data: faculties,
    });
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch faculties',
      error: error.message,
    });
  }
};
