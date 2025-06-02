const CampusGallery = require('../../models/centralAdmin/CampusGallery');
const fs = require('fs');

exports.addCampusGallery = async (req, res) => {
  try {
    const image = req.file.path;
    const newGallery = new CampusGallery({ image });
    await newGallery.save();
    res.status(201).json({ status: true, message: 'Campus gallery image added', data: newGallery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Failed to add campus gallery image' });
  }
};

exports.getAllCampusGallery = async (req, res) => {
  try {
    const images = await CampusGallery.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Failed to fetch campus gallery images' });
  }
};

exports.updateCampusGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file ? req.file.path : null;

    const gallery = await CampusGallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ status: false, message: 'Image not found' });
    }

    if (image && gallery.image) {
      fs.unlinkSync(gallery.image); // delete old file
    }

    gallery.image = image || gallery.image;
    await gallery.save();

    res.status(200).json({ status: true, message: 'Campus gallery updated', data: gallery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Failed to update campus gallery' });
  }
};

exports.deleteCampusGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await CampusGallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ status: false, message: 'Image not found' });
    }

    if (gallery.image) {
      fs.unlinkSync(gallery.image); // delete image file
    }

    await CampusGallery.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: 'Campus gallery deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Failed to delete campus gallery' });
  }
};
