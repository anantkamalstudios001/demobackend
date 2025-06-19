const placementPolicySchema = require('../../models/centralAdmin/placementPolicySchema.js');

exports.addOrUpdatePlacementPolicy = async (req, res) => {
  try {
    const PlacementPolicy = req.db.model('PlacementPolicy', placementPolicySchema);

    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const highlights = JSON.parse(req.body.highlights || '[]');
    const image = req.file ? req.file.filename : null;

    const data = {
      heading,
      paragraph,
      buttonText,
      buttonLink,
      highlights
    };

    if (image) data.image = image;

    let existing = await PlacementPolicy.findOne();

    let saved;
    if (existing) {
      saved = await PlacementPolicy.findByIdAndUpdate(existing._id, data, { new: true });
    } else {
      saved = await new PlacementPolicy(data).save();
    }

    res.status(201).json({ status: true, message: 'Placement Policy saved', data: saved });

  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getPlacementPolicy = async (req, res) => {
  try {
    const PlacementPolicy = req.db.model('PlacementPolicy', placementPolicySchema);
    const data = await PlacementPolicy.findOne();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.updatePlacementPolicy = async (req, res) => {
  try {
    const PlacementPolicy = req.db.model('PlacementPolicy', placementPolicySchema);

    const { heading, paragraph, buttonText, buttonLink, highlights } = req.body;
    const image = req.file ? req.file.filename : null;

    // No need to parse highlights if it's already an array
    const data = {
      heading,
      paragraph,
      buttonText,
      buttonLink,
      highlights: Array.isArray(highlights) ? highlights : JSON.parse(highlights || '[]')
    };

    if (image) data.image = image;

    const updated = await PlacementPolicy.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json({ status: true, message: 'Placement Policy updated', data: updated });

  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};



exports.deletePlacementPolicy = async (req, res) => {
  try {
    const PlacementPolicy = req.db.model('PlacementPolicy', placementPolicySchema);
    const deleted = await PlacementPolicy.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};
