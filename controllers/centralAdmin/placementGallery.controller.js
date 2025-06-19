const placementGallerySchema = require('../../models/centralAdmin/placementGallery.model');

// Create
exports.addPlacementGallery = async (req, res) => {
  try {
    const PlacementGallery = req.db.model('PlacementGallery', placementGallerySchema);
    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const images = req.files?.map(file => file.filename) || [];

    const existing = await PlacementGallery.findOne();
if (existing) {
  existing.heading = heading;
  existing.paragraph = paragraph;
  existing.buttonText = buttonText;
  existing.buttonLink = buttonLink;
  if (images.length) existing.images = images;
  await existing.save();
  res.status(200).json({ status: true, message: 'Placement Gallery updated', data: existing });
} else {
  const saved = await new PlacementGallery({ heading, paragraph, buttonText, buttonLink, images }).save();
  res.status(201).json({ status: true, message: 'Placement Gallery saved', data: saved });
}

  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

// Read
exports.getPlacementGallery = async (req, res) => {
  try {
    const PlacementGallery = req.db.model('PlacementGallery', placementGallerySchema);
    const all = await PlacementGallery.find().sort({ createdAt: -1 });
    res.json({ status: true, data: all });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

// Update
exports.updatePlacementGallery = async (req, res) => {
  try {
    const PlacementGallery = req.db.model('PlacementGallery', placementGallerySchema);
    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const images = req.files?.map(file => file.filename) || [];

    const updated = await PlacementGallery.findByIdAndUpdate(
      req.params.id,
      { heading, paragraph, buttonText, buttonLink, ...(images.length && { images }) },
      { new: true }
    );

    res.json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

// Delete
exports.deletePlacementGallery = async (req, res) => {
  try {
    const PlacementGallery = req.db.model('PlacementGallery', placementGallerySchema);
    await PlacementGallery.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
