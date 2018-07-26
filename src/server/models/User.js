const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

User.pre("save", function(next) {
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

User.methods.validPassword = password => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    return isMatch && !err;
  });
};

module.exports = mongoose.model("User", User);
