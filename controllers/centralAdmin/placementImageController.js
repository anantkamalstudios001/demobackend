const placementImageSchema = require('../../models/centralAdmin/PlacementImage');

// ADD
exports.addPlacementImage = async (req, res) => {
  try {
    const PlacementImage = req.db.model('PlacementImage', placementImageSchema);
    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const newPlacementImage = new PlacementImage({ image: imagePath });
    await newPlacementImage.save();

    res.status(201).json({
      status: true,
      message: 'Placement image uploaded successfully',
      data: newPlacementImage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to upload placement image',
      error: error.message,
    });
  }
};

// GET
exports.getPlacementImages = async (req, res) => {
  try {
    const PlacementImage = req.db.model('PlacementImage', placementImageSchema);
    const images = await PlacementImage.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Placement images fetched successfully',
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch placement images',
      error: error.message,
    });
  }
};

// UPDATE
exports.updatePlacementImage = async (req, res) => {
  try {
    const PlacementImage = req.db.model('PlacementImage', placementImageSchema);
    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const updated = await PlacementImage.findByIdAndUpdate(
      req.params.id,
      { image: imagePath },
      { new: true }
    );

    res.json({
      status: true,
      message: 'Placement image updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update placement image',
      error: error.message,
    });
  }
};

// DELETE
exports.deletePlacementImage = async (req, res) => {
  try {
    const PlacementImage = req.db.model('PlacementImage', placementImageSchema);
    await PlacementImage.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: 'Placement image deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete placement image',
      error: error.message,
    });
  }
};
