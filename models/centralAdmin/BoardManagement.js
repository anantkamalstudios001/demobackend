const mongoose = require('mongoose');

const managementMemberSchema = new mongoose.Schema({
  profile: { type: String }, // Image path
  designation: { type: String, required: true },
  name: { type: String, required: true },
  roleOrDepartment: { type: String, required: true },
});

const boardManagementSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  paragraph: { type: String, required: true },
  management: [managementMemberSchema]
}, { timestamps: true });

module.exports = boardManagementSchema;
