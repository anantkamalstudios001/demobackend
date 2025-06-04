const AltPresidentMessage = require('../../models/centralAdmin/presidentMessageModel');
const path = require('path');
const fs = require('fs');

// Create a new president message
exports.createAltPresidentMessage = async (req, res) => {
  try {
    const { heading, presidentName } = req.body;

    // Collect array values from FormData keys
    const biographyParagraphs = [];
    const visionParagraphs = [];

    Object.keys(req.body).forEach(key => {
      if (key.startsWith('biographyParagraphs')) {
        biographyParagraphs.push(req.body[key]);
      }
      if (key.startsWith('visionParagraphs')) {
        visionParagraphs.push(req.body[key]);
      }
    });

    const image = req.file?.filename || null;

    const newMessage = new AltPresidentMessage({
      heading,
      presidentName,
      image,
      biographyParagraphs,
      visionParagraphs
    });

    await newMessage.save();

    res.status(201).json({ message: 'President message saved successfully' });
  } catch (error) {
    console.error('Error saving president data:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


// Get all president messages
exports.fetchAltPresidentMessages = async (req, res) => {
  try {
    const messages = await AltPresidentMessage.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
};

// Update a message
exports.modifyAltPresidentMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, presidentName } = req.body;
    console.log(req.body)

    const biographyParagraphs = req.body.biographyParagraphs
      ? JSON.parse(req.body.biographyParagraphs)
      : [];

    const visionParagraphs = req.body.visionParagraphs
      ? JSON.parse(req.body.visionParagraphs)
      : [];

    const updateData = {
      heading,
      presidentName,
      biographyParagraphs,
      visionParagraphs,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await AltPresidentMessage.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: 'President message updated', data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Update failed', details: error.message });
  }
};


exports.removeAltPresidentMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await AltPresidentMessage.findById(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.image) {
      const imgPath = path.join(__dirname, '../../uploads/aboutpresident', message.image);
    //   console.log('Deleting image at path:', imgPath);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await AltPresidentMessage.findByIdAndDelete(id);
    res.json({ message: 'President message deleted' });
  } catch (error) {
    console.error('Error deleting AltPresidentMessage:', error);
    res.status(500).json({ error: 'Delete failed', details: error.message });
  }
};

