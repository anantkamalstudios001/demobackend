const PlacementImage = require('../../models/centralAdmin/PlacementImage');

exports.addPlacementImage = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;

    const newPlacementImage = new PlacementImage({
      image: imagePath,
    });

    await newPlacementImage.save();

    res.status(201).json({
      status: true,
      message: 'Placement image uploaded successfully',
      data: newPlacementImage,
    });
  } catch (error) {
    console.error('Error uploading placement image:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to upload placement image',
      error: error.message,
    });
  }
};

exports.getPlacementImages = async (req, res) => {
  try {
    const images = await PlacementImage.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Placement images fetched successfully',
      data: images,
    });
  } catch (error) {
    console.error('Error fetching placement images:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch placement images',
      error: error.message,
    });
  }
};
