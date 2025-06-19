const imageCaptionSchema = require('../../models/centralAdmin/imageCaption.model');

// Create
exports.addImageCaption = async (req, res) => {
  try {
    const ImageCaption = req.db.model('ImageCaption', imageCaptionSchema);
    const image = req.file?.filename;
    const { caption } = req.body;

    if (!image || !caption) {
      return res.status(400).json({ status: false, message: 'Image and caption are required' });
    }

    const saved = await new ImageCaption({ image, caption }).save();
    res.status(201).json({ status: true, message: 'Image caption added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

// Read
exports.getImageCaptions = async (req, res) => {
  try {
const ImageCaption = req.db.models.ImageCaption || req.db.model('ImageCaption', imageCaptionSchema);
    const data = await ImageCaption.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

// Update
exports.updateImageCaption = async (req, res) => {
  try {
    const ImageCaption = req.db.model('ImageCaption', imageCaptionSchema);
    const { caption } = req.body;
    const image = req.file?.filename;

    const updateData = { caption };
    if (image) updateData.image = image;

    const updated = await ImageCaption.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ status: true, message: 'Image caption updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

// Delete
exports.deleteImageCaption = async (req, res) => {
  try {
    const ImageCaption = req.db.model('ImageCaption', imageCaptionSchema);
    await ImageCaption.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Image caption deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
