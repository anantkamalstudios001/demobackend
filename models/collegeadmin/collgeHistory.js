const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true, minlength: 50 }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
