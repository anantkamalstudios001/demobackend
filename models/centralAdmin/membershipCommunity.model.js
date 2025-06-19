const mongoose = require('mongoose');

const opportunitiesSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  link: { type: String, required: true }
});

const membershipCommunitySchema = new mongoose.Schema({
  introParagraph: { type: String, required: true },
  opportunities: [opportunitiesSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = membershipCommunitySchema;
