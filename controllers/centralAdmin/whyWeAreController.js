const whyWeAreSchema = require('../../models/centralAdmin/WhyWeAre');

// Add Why We Are (only one entry allowed)
exports.addWhyWeAreContent = async (req, res) => {
  try {
    const WhyWeAre = req.db.model('WhyWeAre', whyWeAreSchema);

    const existing = await WhyWeAre.findOne();
    if (existing) {
      return res.status(400).json({ status: false, message: 'Only one entry is allowed.' });
    }

    const image = req.file ? req.file.path : '';
    const { description } = req.body;

    const newEntry = new WhyWeAre({ image, description });
    await newEntry.save();

    res.status(200).json({ status: true, message: 'Why We Are entry added', data: newEntry });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to add entry', error: err.message });
  }
};

// Get latest Why We Are entry
exports.getWhyWeAreContent = async (req, res) => {
  try {
    const WhyWeAre = req.db.model('WhyWeAre', whyWeAreSchema);
    const entries = await WhyWeAre.find().sort({ createdAt: -1 }).limit(1);

    res.status(200).json({ status: true, data: entries });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch entries', error: err.message });
  }
};

// Update Why We Are entry
exports.updateWhyWeAreContent = async (req, res) => {
  try {
    const WhyWeAre = req.db.model('WhyWeAre', whyWeAreSchema);
    const { id } = req.params;
    const image = req.file ? req.file.path : undefined;
    const { description } = req.body;

    const updateData = { description };
    if (image) updateData.image = image;

    const updatedEntry = await WhyWeAre.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedEntry) {
      return res.status(404).json({ status: false, message: 'Entry not found' });
    }

    res.status(200).json({ status: true, message: 'Entry updated', data: updatedEntry });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update entry', error: err.message });
  }
};

// Delete Why We Are entry
exports.deleteWhyWeAreContent = async (req, res) => {
  try {
    const WhyWeAre = req.db.model('WhyWeAre', whyWeAreSchema);
    const { id } = req.params;

    const deletedEntry = await WhyWeAre.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ status: false, message: 'Entry not found' });
    }

    res.status(200).json({ status: true, message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete entry', error: err.message });
  }
};
