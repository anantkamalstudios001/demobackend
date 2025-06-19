const fs = require('fs');
const campusGallerySchema = require('../../models/centralAdmin/CampusGallery');

exports.addCampusGallery = async (req, res) => {
  try {
    const CampusGallery = req.db.model('CampusGallery', campusGallerySchema);
    const image = req.file.path;

    const newGallery = new CampusGallery({ image });
    await newGallery.save();

    res.status(201).json({ status: true, message: 'Campus gallery image added', data: newGallery });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to add campus gallery image', error: err.message });
  }
};

exports.getAllCampusGallery = async (req, res) => {
  try {
    const CampusGallery = req.db.model('CampusGallery', campusGallerySchema);
    const images = await CampusGallery.find().sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: images });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch campus gallery images', error: err.message });
  }
};

exports.updateCampusGallery = async (req, res) => {
  try {
    const CampusGallery = req.db.model('CampusGallery', campusGallerySchema);
    const { id } = req.params;
    const image = req.file ? req.file.path : null;

    const gallery = await CampusGallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ status: false, message: 'Image not found' });
    }

    if (image && gallery.image) {
      fs.unlinkSync(gallery.image); // remove old file
    }

    gallery.image = image || gallery.image;
    await gallery.save();

    res.status(200).json({ status: true, message: 'Campus gallery updated', data: gallery });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update campus gallery', error: err.message });
  }
};

exports.deleteCampusGallery = async (req, res) => {
  try {
    const CampusGallery = req.db.model('CampusGallery', campusGallerySchema);
    const { id } = req.params;

    const gallery = await CampusGallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ status: false, message: 'Image not found' });
    }

    if (gallery.image) {
      fs.unlinkSync(gallery.image); // remove file
    }

    await CampusGallery.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: 'Campus gallery deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete campus gallery', error: err.message });
  }
};
