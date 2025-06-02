const Article = require('../../models/centralAdmin/Article');

exports.addArticle = async (req, res) => {
  try {
    const {
      title,
      postCategory,
      authorName,
      postDate,
      subSections,
    } = req.body;

    const articleImage = req.files['articleImage']
      ? req.files['articleImage'][0].path
      : '';
    const authorImage = req.files['authorImage']
      ? req.files['authorImage'][0].path
      : '';

    const newArticle = new Article({
      title,
      postCategory,
      authorName,
      postDate,
      subSections: JSON.parse(subSections),
      articleImage,
      authorImage,
    });

    await newArticle.save();

    res.status(201).json({
      status: true,
      message: 'Article added successfully',
      data: newArticle,
    });
  } catch (error) {
    console.error('Error adding article:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add article',
      error: error.message,
    });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Articles fetched successfully',
      data: articles,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch articles',
      error: error.message,
    });
  }
};
