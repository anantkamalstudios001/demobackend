const aboutSchema = require('../../models/centralAdmin/About');

// ADD
exports.addAboutContent = async (req, res) => {
  try {
    const About = req.db.model('About', aboutSchema);
    const { paragraphs } = req.body;
    const parsedParagraphs = JSON.parse(paragraphs);
    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : '';

    const aboutEntry = new About({
      image: imagePath,
      paragraphs: parsedParagraphs,
    });

    await aboutEntry.save();

    res.status(201).json({
      status: true,
      message: 'About content added successfully',
      data: aboutEntry,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add about content',
      error: error.message,
    });
  }
};

// GET
exports.getAboutContent = async (req, res) => {
  try {
    const About = req.db.model('About', aboutSchema);
    const aboutList = await About.find().sort({ createdAt: -1 });
    res.json({
      status: true,
      message: 'About content fetched successfully',
      data: aboutList,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch about content',
      error: error.message,
    });
  }
};

// UPDATE
exports.updateAboutContent = async (req, res) => {
  try {
    const About = req.db.model('About', aboutSchema);
    const { paragraphs } = req.body;
    const parsedParagraphs = JSON.parse(paragraphs);
    const updateData = {
      paragraphs: parsedParagraphs
    };

    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, '/');
    }

    const updated = await About.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({
      status: true,
      message: 'About content updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update about content',
      error: error.message,
    });
  }
};

// DELETE
exports.deleteAboutContent = async (req, res) => {
  try {
    const About = req.db.model('About', aboutSchema);
    await About.findByIdAndDelete(req.params.id);
    res.json({
      status: true,
      message: 'About content deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete about content',
      error: error.message,
    });
  }
};
