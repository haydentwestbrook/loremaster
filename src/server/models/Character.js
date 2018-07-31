const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: String,
  data: String,
  deleted: Boolean,
  num: Number,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Character', CharacterSchema);
