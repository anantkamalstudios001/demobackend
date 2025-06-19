const placementSchema = require('../../models/centralAdmin/Placement');

// ADD
exports.addPlacement = async (req, res) => {
  try {
    const Placement = req.db.model('Placement', placementSchema);
    const { label, number, sign } = req.body;

    const newPlacement = new Placement({ label, number, sign });
    await newPlacement.save();

    res.status(201).json({
      status: true,
      message: 'Placement stat added successfully',
      data: newPlacement,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add placement stat',
      error: error.message,
    });
  }
};

// GET
exports.getPlacements = async (req, res) => {
  try {
    const Placement = req.db.model('Placement', placementSchema);
    const placements = await Placement.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Placements fetched successfully',
      data: placements,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch placements',
      error: error.message,
    });
  }
};

// UPDATE
exports.updatePlacement = async (req, res) => {
  try {
    const Placement = req.db.model('Placement', placementSchema);
    const { label, number, sign } = req.body;

    const updated = await Placement.findByIdAndUpdate(
      req.params.id,
      { label, number, sign },
      { new: true }
    );

    res.json({
      status: true,
      message: 'Placement stat updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update placement',
      error: error.message,
    });
  }
};

// DELETE
exports.deletePlacement = async (req, res) => {
  try {
    const Placement = req.db.model('Placement', placementSchema);
    await Placement.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: 'Placement stat deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete placement',
      error: error.message,
    });
  }
};
