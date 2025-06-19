const placementOverviewSchema = require('../../models/centralAdmin/placementOverview.model');

exports.addPlacementOverview = async (req, res) => {
  try {
    const PlacementOverview = req.db.model('PlacementOverview', placementOverviewSchema);
    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const points = JSON.parse(req.body.points || '[]');
    const image = req.file ? req.file.filename : null;

    const existing = await PlacementOverview.findOne();

    const data = {
      heading,
      paragraph,
      buttonText,
      buttonLink,
      points
    };

    if (image) data.image = image;

    let saved;
    if (existing) {
      // Update the existing document
      saved = await PlacementOverview.findByIdAndUpdate(existing._id, data, { new: true });
    } else {
      // Create new if none exists
      saved = await new PlacementOverview(data).save();
    }

    res.status(201).json({ status: true, message: 'Placement Overview saved', data: saved });

  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};


// Read
exports.getPlacementOverview = async (req, res) => {
  try {
    const PlacementOverview = req.db.model('PlacementOverview', placementOverviewSchema);
    const data = await PlacementOverview.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

// Update
exports.updatePlacementOverview = async (req, res) => {
  try {
    const PlacementOverview = req.db.model('PlacementOverview', placementOverviewSchema);
    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const points = JSON.parse(req.body.points || '[]');
    const updateData = { heading, paragraph, buttonText, buttonLink, points };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await PlacementOverview.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ status: true, message: 'Updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

// Delete
exports.deletePlacementOverview = async (req, res) => {
  try {
    const PlacementOverview = req.db.model('PlacementOverview', placementOverviewSchema);
    await PlacementOverview.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
