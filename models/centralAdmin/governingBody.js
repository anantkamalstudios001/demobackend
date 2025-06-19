const mongoose = require('mongoose');

const governingBodySchema = new mongoose.Schema({
  about: { type: String, required: true },
  roles: [{ type: String }],
  members: [
    {
      name: { type: String, required: true },
      post: { type: String },
      about: { type: String },
      image: { type: String } // store file path or filename
    }
  ]
}, { timestamps: true });

module.exports = governingBodySchema;
