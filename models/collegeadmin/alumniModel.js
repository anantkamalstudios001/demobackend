const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  course: String,
  passingYear: String,
  currentOccupation: String,
  location: String
}, { timestamps: true });

module.exports = (department) => {
  const modelName = `${department}_alumni`;

  if (mongoose.models[modelName]) {
    return mongoose.model(modelName);
  }

  return mongoose.model(modelName, alumniSchema, modelName);
};
