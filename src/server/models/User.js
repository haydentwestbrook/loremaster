const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }]
});

UserScheme.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserScheme.methods.comparePassword = function(password, next) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) throw err;
    next(isMatch);
  });
};

module.exports = mongoose.model("User", UserScheme);
