const eventGallerySchema = require('../../models/centralAdmin/eventGallery.model');

// CREATE
exports.addEventGallery = async (req, res) => {
  try {
    const EventGallery = req.db.model('EventGallery', eventGallerySchema);
    const image = req.file?.filename;
    const { caption } = req.body;

    if (!image || !caption) {
      return res.status(400).json({ status: false, message: 'Image and caption are required' });
    }

    const saved = await new EventGallery({ image, caption }).save();
    res.status(201).json({ status: true, message: 'Event Gallery added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

// READ (Get All)
exports.getEventGallery = async (req, res) => {
  try {
    const EventGallery = req.db.model('EventGallery', eventGallerySchema);
    const data = await EventGallery.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

// UPDATE
exports.updateEventGallery = async (req, res) => {
  try {
    const EventGallery = req.db.model('EventGallery', eventGallerySchema);
    const { caption } = req.body;
    const image = req.file?.filename;

    const updateData = { caption };
    if (image) updateData.image = image;

    const updated = await EventGallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ status: true, message: 'Event Gallery updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

// DELETE
exports.deleteEventGallery = async (req, res) => {
  try {
    const EventGallery = req.db.model('EventGallery', eventGallerySchema);
    await EventGallery.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Event Gallery deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
