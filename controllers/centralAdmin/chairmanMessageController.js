const chairmanMessageSchema = require('../../models/centralAdmin/chairmanMessageModel');
const fs = require('fs');
const path = require('path');

// Create
exports.createChairmanMessage = async (req, res) => {
  try {
    const ChairmanMessage = req.db.model('ChairmanMessage', chairmanMessageSchema);

    const { paragraph1, paragraph2, chairmansName } = req.body;
    const image = req.file?.filename || null;

    const biographyParagraphs = [];
    const visionParagraphs = [];

    Object.keys(req.body).forEach(key => {
      if (key.startsWith('biographyParagraphs')) biographyParagraphs.push(req.body[key]);
      if (key.startsWith('visionParagraphs')) visionParagraphs.push(req.body[key]);
    });

    const newMsg = new ChairmanMessage({
      paragraph1,
      paragraph2,
      chairmansName,
      image,
      biographyParagraphs,
      visionParagraphs,
    });

    await newMsg.save();
    res.status(201).json({ message: 'Chairman message saved successfully', data: newMsg });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed', details: error.message });
  }
};

// Get
exports.fetchChairmanMessages = async (req, res) => {
  try {
    const ChairmanMessage = req.db.model('ChairmanMessage', chairmanMessageSchema);
    const data = await ChairmanMessage.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed', details: error.message });
  }
};

// Update
exports.updateChairmanMessage = async (req, res) => {
  try {
    const ChairmanMessage = req.db.model('ChairmanMessage', chairmanMessageSchema);
    const { id } = req.params;
    const { paragraph1, paragraph2, chairmansName } = req.body;

    const biographyParagraphs = req.body.biographyParagraphs
      ? JSON.parse(req.body.biographyParagraphs)
      : [];

    const visionParagraphs = req.body.visionParagraphs
      ? JSON.parse(req.body.visionParagraphs)
      : [];

    const updateData = {
      paragraph1,
      paragraph2,
      chairmansName,
      biographyParagraphs,
      visionParagraphs
    };

    if (req.file) updateData.image = req.file.filename;

    const updated = await ChairmanMessage.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: 'Chairman message updated', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Update failed', details: error.message });
  }
};

// Delete
exports.deleteChairmanMessage = async (req, res) => {
  try {
    const ChairmanMessage = req.db.model('ChairmanMessage', chairmanMessageSchema);
    const { id } = req.params;

    const doc = await ChairmanMessage.findById(id);
    if (!doc) return res.status(404).json({ error: 'Chairman message not found' });

    if (doc.image) {
      const imgPath = path.join(__dirname, '/uploads/chairman', doc.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await ChairmanMessage.findByIdAndDelete(id);
    res.json({ message: 'Chairman message deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed', details: error.message });
  }
};
