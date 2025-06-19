const mongoose = require('mongoose');

const achievementCardSchema = new mongoose.Schema({
  achievement: { type: String, required: true },
  heading: { type: String, required: true },
  icon: { type: String, required: true },
  paragraph: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = achievementCardSchema;
