const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  postCategory: { type: String, required: true },
  authorName: { type: String, required: true },
  postDate: { type: Date, required: true },
  subSections: [
    {
      subheading: { type: String },
      paragraph: { type: String },
    },
  ],
  articleImage: { type: String, required: true },
  authorImage: { type: String, required: true },
}, { timestamps: true });

module.exports = articleSchema;
