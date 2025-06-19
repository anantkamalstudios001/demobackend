const futureProgrammeSchema = require('../../models/centralAdmin/FutureProgramme');

// ADD
exports.addFutureProgramme = async (req, res) => {
  try {
    const FutureProgramme = req.db.model('FutureProgramme', futureProgrammeSchema);
    const { programName, paragraph } = req.body;

    const newProgramme = new FutureProgramme({ programName, paragraph });
    await newProgramme.save();

    res.status(201).json({
      status: true,
      message: 'Future-Ready Programme added successfully',
      data: newProgramme,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add future programme',
      error: error.message,
    });
  }
};

// GET
exports.getFutureProgrammes = async (req, res) => {
  try {
    const FutureProgramme = req.db.model('FutureProgramme', futureProgrammeSchema);
    const programmes = await FutureProgramme.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Future-Ready Programmes fetched successfully',
      data: programmes,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch future programmes',
      error: error.message,
    });
  }
};

// UPDATE
exports.updateFutureProgramme = async (req, res) => {
  try {
    const FutureProgramme = req.db.model('FutureProgramme', futureProgrammeSchema);
    const { programName, paragraph } = req.body;

    const updated = await FutureProgramme.findByIdAndUpdate(
      req.params.id,
      { programName, paragraph },
      { new: true }
    );

    res.json({
      status: true,
      message: 'Future-Ready Programme updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update future programme',
      error: error.message,
    });
  }
};

// DELETE
exports.deleteFutureProgramme = async (req, res) => {
  try {
    const FutureProgramme = req.db.model('FutureProgramme', futureProgrammeSchema);
    await FutureProgramme.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: 'Future-Ready Programme deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete future programme',
      error: error.message,
    });
  }
};
