const mongoose = require('mongoose');

const welcomeSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  message: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('WelcomeMessage', welcomeSchema);
