const mongoose = require('mongoose');

const futureProgrammeSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  paragraph: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('central_FutureProgramme', futureProgrammeSchema);
