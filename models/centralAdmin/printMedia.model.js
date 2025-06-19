const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: { type: String, required: true },
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  buttonLink: { type: String, required: true }
});

const printMediaSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  buttonName: { type: String, required: true },
  cards: { type: [cardSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = printMediaSchema;
