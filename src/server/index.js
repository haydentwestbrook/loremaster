const express = require("express");
const os = require("os");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
mongoose
  .connect(
    "mongodb://localhost/users",
    { promiseLibrary: require("bluebird") }
  )
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

const User = require("./models/User");

const app = express();

app.use(express.static("dist"));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: "keyboard cat" }));
app.use(flash());

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/characters",
    failureRedirect: "/"
  })
);

app.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      message: "Please pass username and password."
    });
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: "Username already exists."
        });
      }
      return res.json({
        success: true,
        message: "Successful created new user."
      });
    });
  }
});

passport.serializeUser(function(user, done) {
  console.log("Serialize user called.");
  return done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log("Deserialize user called.");
  return done(null, { test: "test" });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.status(404).redirect("/");
});
app.listen(8080, () => console.log("Listening on port 8080!"));
