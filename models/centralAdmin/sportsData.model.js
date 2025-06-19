const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  icon: { type: String },
  heading: { type: String, required: true },
  paragraph: { type: String, required: true }
});

const sportsDataSchema = new mongoose.Schema({
  buttonName: { type: String, required: true },
  cards: { type: [cardSchema], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = sportsDataSchema;
