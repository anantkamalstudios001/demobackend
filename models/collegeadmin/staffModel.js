const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  first: String,
  last: String,
  gender: String,
  mobile: Number,
  password: String,
  conformPassword: String,
  designation: String,
  department_name: String,
  address: String,
  email: String,
  dob: Date,
  education: String,
  filePath: String
}, { timestamps: true });

module.exports = (department) => {
  const modelName = `${department}_staff`;
  return mongoose.models[modelName] || mongoose.model(modelName, staffSchema, modelName);
};
