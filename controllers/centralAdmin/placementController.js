const Placement = require('../../models/centralAdmin/Placement');

exports.addPlacement = async (req, res) => {
  try {
    const { label, number, sign } = req.body;

    const newPlacement = new Placement({
      label,
      number,
      sign,
    });

    await newPlacement.save();

    res.status(201).json({
      status: true,
      message: 'Placement stat added successfully',
      data: newPlacement,
    });
  } catch (error) {
    console.error('Error adding placement:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add placement stat',
      error: error.message,
    });
  }
};

exports.getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Placements fetched successfully',
      data: placements,
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch placements',
      error: error.message,
    });
  }
};
