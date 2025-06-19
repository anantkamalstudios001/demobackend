const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  image: {
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

module.exports = aboutSchema;
