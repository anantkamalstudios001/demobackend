const articleSchema = require('../../models/centralAdmin/Article');

// Add Article
exports.addArticle = async (req, res) => {
  try {
    const Article = req.db.model('Article', articleSchema);

    const {
      title,
      postCategory,
      authorName,
      postDate,
      subSections,
    } = req.body;

    const articleImage = req.files['articleImage'] ? req.files['articleImage'][0].path : '';
    const authorImage = req.files['authorImage'] ? req.files['authorImage'][0].path : '';

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

// Get All Articles
exports.getArticles = async (req, res) => {
  try {
    const Article = req.db.model('Article', articleSchema);
    const articles = await Article.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Articles fetched successfully',
      data: articles,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch articles',
      error: error.message,
    });
  }
};

// Update Article
exports.updateArticle = async (req, res) => {
  try {
    const Article = req.db.model('Article', articleSchema);
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      postCategory: req.body.postCategory,
      authorName: req.body.authorName,
      postDate: req.body.postDate,
      subSections: JSON.parse(req.body.subSections),
    };

    if (req.files['articleImage']) {
      updateData.articleImage = req.files['articleImage'][0].path;
    }
    if (req.files['authorImage']) {
      updateData.authorImage = req.files['authorImage'][0].path;
    }

    const updated = await Article.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
      status: true,
      message: 'Article updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update article',
      error: error.message,
    });
  }
};

// Delete Article
exports.deleteArticle = async (req, res) => {
  try {
    const Article = req.db.model('Article', articleSchema);
    const { id } = req.params;

    await Article.findByIdAndDelete(id);

    res.json({
      status: true,
      message: 'Article deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete article',
      error: error.message,
    });
  }
};
