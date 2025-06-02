const FutureProgramme = require('../../models/centralAdmin/FutureProgramme');

exports.addFutureProgramme = async (req, res) => {
  try {
    const { programName, paragraph } = req.body;

    const newProgramme = new FutureProgramme({
      programName,
      paragraph,
    });

    await newProgramme.save();

    res.status(201).json({
      status: true,
      message: 'Future-Ready Programme added successfully',
      data: newProgramme,
    });
  } catch (error) {
    console.error('Error adding future programme:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add future programme',
      error: error.message,
    });
  }
};

exports.getFutureProgrammes = async (req, res) => {
  try {
    const programmes = await FutureProgramme.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Future-Ready Programmes fetched successfully',
      data: programmes,
    });
  } catch (error) {
    console.error('Error fetching future programmes:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch future programmes',
      error: error.message,
    });
  }
};
