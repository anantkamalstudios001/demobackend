const mongoose = require('mongoose');
const boardManagementMemberSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  name: { type: String, required: true },
  roleOrDept: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });


module.exports = boardManagementMemberSchema;
