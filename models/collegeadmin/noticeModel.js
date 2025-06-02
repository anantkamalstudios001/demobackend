const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: String,
  category: String,
  startDate: Date,
  endDate: Date,
  content: String
}, { timestamps: true });

module.exports = (department) => {
  const modelName = `${department}_notices`;
  return mongoose.models[modelName] || mongoose.model(modelName, noticeSchema, modelName);
};


// const mongoose = require('mongoose');

// const noticeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   category: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date }, // Optional
//   content: { type: String, required: true }
// }, { timestamps: true });

// module.exports = (department) => {
//   const modelName = `${department}_notices`;
//   return mongoose.models[modelName] || mongoose.model(modelName, noticeSchema, modelName);
// };
