const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: String,
  data: String,
  deleted: {
    type: Boolean,
    default: false
  },
  index: Number,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Character', CharacterSchema);
