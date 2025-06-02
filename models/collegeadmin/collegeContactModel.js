const mongoose = require('mongoose');

const collegeContactSchema = new mongoose.Schema({
  collegeName: String,
  email: String,
  phone: String,
  altPhone: String,
  website: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  mapLocation: String
}, { timestamps: true });

module.exports = (department) => {
  const modelName = `${department}_college_contact`;

  if (mongoose.models[modelName]) {
    return mongoose.model(modelName);
  }

  return mongoose.model(modelName, collegeContactSchema, modelName);
};
