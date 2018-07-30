const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Character = require("../models/character");
const newCharacter = require("../data/newCharacter");

router.get("/characters/get", (req, res) => {
  if (!authenticate(req, res)) return;
  const { userId, charNum } = req.query;
  if (charNum === "all") {
    getAllCharacters(userId, res);
  } else {
    getCharacter(userId, charNum, res);
  }
});

getAllCharacters = (userId, res) => {
  User.findOne({ _id: userId }, (err, user) => {
    if (err) handleError(err, res);
    res.json(user.characters);
  });
};

getCharacter = (userId, num, res) => {
  User.findOne({ _id: userId })
    .populate("characters")
    .exec(function(err, user) {
      if (err) handleError(err, res);
      res.json(user);
    });
};

router.get("/characters/save", (req, res) => {
  if (!authenticate(req, res)) return;
  const { userId, charNum, data } = req.query;
  User.findOne({ _id: userId })
    .populate("characters")
    .exec((err, user) => {
      if (err) handleError(err, res);
      user.save(err => {
        if (err) handleError(err, res);
        if (user.characters.length <= charNum)
          res.json({ success: false, message: "Could not locate character." });
        const char = user.characters[charNum];
        char.data = data;
        char.save(err => {
          if (err) handleError(err, res);
          else
            res.json({
              success: true,
              character: { name: char.name, data: char.data }
            });
        });
      });
    });
});

router.get("/characters/new", (req, res) => {
  if (!authenticate(req, res)) return;
  const { userId, data } = req.query;
  User.findOne({ _id: userId })
    .populate("characters")
    .exec((err, user) => {
      if (err) handleError(err, res);
      const char = new Character({
        _user: user,
        name: data,
        data: data
      });
      user.characters.push(char);
      user.save(err => {
        if (err) handleError(err, res);
        char.save(err => {
          if (err) handleError(err, res);
          res.json({
            success: true,
            character: { name: char.name, data: char.data }
          });
        });
      });
    });
});

handleError = (error, res) => {
  res.json(err);
  throw err;
};

authenticate = (req, res) => {
  if (false) {
    res.status(401).send({
      success: false,
      message: "Authentication failed."
    });
  }
  return true;
};

module.exports = router;
