const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['central-admin', 'college-admin'] },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
});

module.exports = mongoose.model('User', UserSchema);
