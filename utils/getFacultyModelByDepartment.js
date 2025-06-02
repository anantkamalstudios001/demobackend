const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: String,
  designation: String,
  department: String,
  qualification: String,
  experience: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = (department) => {
  const modelName = `${department}_faculty`;

  if (mongoose.models[modelName]) {
    return mongoose.model(modelName);
  }

  return mongoose.model(modelName, facultySchema, modelName);
};
