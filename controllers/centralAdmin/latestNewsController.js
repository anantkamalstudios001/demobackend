const latestNewsSchema = require('../../models/centralAdmin/LatestNews');

exports.addLatestNews = async (req, res) => {
  try {
    const LatestNews = req.db.model('LatestNews', latestNewsSchema);
    const { heading, link } = req.body;

    const newNews = new LatestNews({ heading, link });
    await newNews.save();

    res.status(201).json({
      status: true,
      message: 'Latest news added successfully',
      data: newNews
    });
  } catch (err) {
    console.error('Error adding latest news:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to add latest news',
      error: err.message
    });
  }
};

exports.getLatestNews = async (req, res) => {
  try {
    const LatestNews = req.db.model('LatestNews', latestNewsSchema);
    const news = await LatestNews.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: 'Latest news fetched successfully',
      data: news
    });
  } catch (err) {
    console.error('Error fetching latest news:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch latest news',
      error: err.message
    });
  }
};

exports.updateLatestNews = async (req, res) => {
  try {
    const LatestNews = req.db.model('LatestNews', latestNewsSchema);
    const { id } = req.params;
    const { heading, link } = req.body;

    const updated = await LatestNews.findByIdAndUpdate(
      id,
      { heading, link },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: 'News not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Latest news updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating latest news:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to update latest news',
      error: err.message
    });
  }
};

exports.deleteLatestNews = async (req, res) => {
  try {
    const LatestNews = req.db.model('LatestNews', latestNewsSchema);
    const { id } = req.params;

    const deleted = await LatestNews.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'News not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Latest news deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting latest news:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to delete latest news',
      error: err.message
    });
  }
};
