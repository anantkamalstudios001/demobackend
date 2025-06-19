const mediaGallerySchema = require('../../models/centralAdmin/mediaGallery.model');

exports.addMediaGallery = async (req, res) => {
  try {
    const MediaGallery = req.db.model('MediaGallery', mediaGallerySchema);
    const saved = await new MediaGallery({ image: req.file.filename }).save();
    res.status(201).json({ status: true, message: 'Media added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

exports.getMediaGallery = async (req, res) => {
  try {
    const MediaGallery = req.db.model('MediaGallery', mediaGallerySchema);
    const data = await MediaGallery.find().sort({ createdAt: -1 });
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateMediaGallery = async (req, res) => {
  try {
    const MediaGallery = req.db.model('MediaGallery', mediaGallerySchema);
    const updated = await MediaGallery.findByIdAndUpdate(
      req.params.id,
      { image: req.file?.filename },
      { new: true }
    );
    res.json({ status: true, message: 'Media updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteMediaGallery = async (req, res) => {
  try {
    const MediaGallery = req.db.model('MediaGallery', mediaGallerySchema);
    await MediaGallery.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Media deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
