const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  personName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  starRating: { type: Number, required: true },
  testimonialContent: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_Testimonial', testimonialSchema);
