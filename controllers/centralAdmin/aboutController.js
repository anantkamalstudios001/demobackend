const About = require('../../models/centralAdmin/About');

// Add About content
exports.addAboutContent = async (req, res) => {
  try {
    const { paragraphs } = req.body; // this is JSON string
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
    console.error('Error adding about content:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add about content',
      error: error.message,
    });
  }
};

// (Optional) Get About content
exports.getAboutContent = async (req, res) => {
  try {
    const aboutList = await About.find();
    res.json({
      status: true,
      message: 'About content fetched successfully',
      data: aboutList,
    });
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch about content',
      error: error.message,
    });
  }
};
