const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  achievement: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = achievementSchema;
