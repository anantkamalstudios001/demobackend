const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  postCategory: { type: String, required: true },
  authorName: { type: String, required: true },
  postDate: { type: Date, required: true },
  subSections: [
    {
      subheading: String,
      paragraph: String,
    },
  ],
  articleImage: { type: String, required: true },
  authorImage: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_Article', articleSchema);
