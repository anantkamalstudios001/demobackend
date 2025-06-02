const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: String,
  order: Number,
  isActive: Boolean,
  imagePath: String
});

module.exports = mongoose.model('Banner', bannerSchema);
