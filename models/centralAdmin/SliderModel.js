const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Main_Slider', sliderSchema);
