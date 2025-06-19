const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  listItems: [{ type: String, required: true }]
});

const ourCommitteesSchema = new mongoose.Schema({
  introParagraph: { type: String, required: true },
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = ourCommitteesSchema;
