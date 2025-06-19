const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  twitterLink: { type: String, default: '' },
  facebookLink: { type: String, default: '' },
  instagramLink: { type: String, default: '' },
  linkedinLink: { type: String, default: '' },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = facultySchema;
