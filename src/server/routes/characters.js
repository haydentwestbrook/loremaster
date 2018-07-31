const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const Character = require('../models/character');
const newCharacter = require('../data/newCharacter');

router.post('/characters/get', (req, res) => {
  if (!authenticate(req, res)) return;
  const { userId, charNum } = req.body;
  if (userId == null || charNum == null) return error(res);
  if (charNum === 'all') {
    getAllCharacters(userId, res);
  } else {
    getCharacter(userId, charNum, res);
  }
});

getAllCharacters = (userId, res) => {
  User.findOne({ _id: userId })
    .populate('characters')
    .exec((err, user) => {
      if (err) handleError(err, res);
      else if (!user) return error(res);
      else {
        let chars = [];
        user.characters.map(char => {
          chars.push({ name: char.name, num: char.num });
        });
        res.json(chars);
      }
    });
};

getCharacter = (userId, num, res) => {
  Character.findOne(
    {
      _user: new mongoose.Types.ObjectId(userId),
      num: num
    },
    (err, character) => {
      if (!character) return error(res);
      else {
        res.json({ name: character.name, data: character.data });
      }
    }
  );
};

router.post('/characters/save', (req, res) => {
  if (!authenticate(req, res)) return;
  const { userId, charNum, data } = req.body;
  if (userId == null || charNum == null || data == null) return error(res);
  else {
    Character.findOne({
      _user: new mongoose.Types.ObjectId(userId),
      num: charNum
    }).exec((err, character) => {
      if (err) handleError(err, res);
      character.data = JSON.stringify(data);
      character.save(err => {
        if (err) handleError(err, res);
        else res.json({ success: true, character: character });
      });
    });
  }
});

router.post('/characters/new', (req, res) => {
  if (!authenticate(req, res)) return;
  const { userId } = req.body;
  if (userId == null) return error(res);
  else {
    User.findOne({ _id: userId })
      .populate('characters')
      .exec((err, user) => {
        if (err) handleError(err, res);
        if (!user) return error(res);
        else {
          const char = new Character({
            _user: user,
            num: user.characters.length + 1,
            name: newCharacter.info.name,
            data: JSON.stringify(newCharacter)
          });
          user.characters.push(char);
          user.save(err => {
            if (err) handleError(err, res);
            else {
              char.save(err => {
                if (err) handleError(err, res);
                else {
                  res.json({
                    success: true,
                    character: {
                      name: char.name,
                      data: char.data,
                      num: char.num
                    }
                  });
                }
              });
            }
          });
        }
      });
  }
});

error = res => {};

handleError = (err, res) => {
  res.json(err);
  throw err;
};

authenticate = (req, res) => {
  if (false) {
    res.status(401).send({
      success: false,
      message: 'Authentication failed.'
    });
  }
  return true;
};

module.exports = router;
