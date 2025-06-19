const mongoose = require('mongoose');

const paragraphBlockSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  paragraphs: [
    {
      text: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = paragraphBlockSchema;
