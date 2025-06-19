const facilityGallerySchema = require('../../models/centralAdmin/facilityGallery.model');

exports.addFacilityGallery = async (req, res) => {
  try {
    const FacilityGallery = req.db.model('FacilityGallery', facilityGallerySchema);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ status: false, message: 'Image is required' });
    }

    const saved = await new FacilityGallery({ image: file.filename }).save();
    res.status(201).json({ status: true, message: 'Image uploaded', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Upload failed', error: err.message });
  }
};

exports.getFacilityGallery = async (req, res) => {
  try {
    const FacilityGallery = req.db.model('FacilityGallery', facilityGallerySchema);
    const data = await FacilityGallery.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};
exports.updateFacilityGallery = async (req, res) => {
  try {
    const FacilityGallery = req.db.model('FacilityGallery', facilityGallerySchema);
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ status: false, message: 'New image file is required' });
    }

    const updated = await FacilityGallery.findByIdAndUpdate(
      id,
      { image: req.file.filename },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: 'Image not found' });
    }

    res.status(200).json({ status: true, message: 'Image updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};


exports.deleteFacilityGallery = async (req, res) => {
  try {
    const FacilityGallery = req.db.model('FacilityGallery', facilityGallerySchema);
    await FacilityGallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
