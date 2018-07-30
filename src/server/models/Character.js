const mongoose = require("mongoose");

const CharacterScheme = new mongoose.Schema({
  name: String,
  data: String,
  deleted: Boolean,
  _user: { type: Number, ref: "User" }
});

module.exports = mongoose.model("Character", CharacterScheme);
