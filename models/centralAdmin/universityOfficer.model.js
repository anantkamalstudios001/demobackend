const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  name: { type: String, required: true },
  roleOrDepartment: { type: String, required: true },
  profile: { type: String }
});

const universityOfficerSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  officers: [officerSchema]
}, { timestamps: true });

module.exports = universityOfficerSchema;
