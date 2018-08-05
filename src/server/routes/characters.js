const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const Character = require('../models/character');
const newCharacter = require('../data/newCharacter');
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');

///////////////////////////////////////////////////////////////////////////////
//    /characters/get
///////////////////////////////////////////////////////////////////////////////
router.post('/characters/get', (req, res) => {
  const { token, index } = req.body;
  getCharactersRoute(token, index, res);
});

router.get('/characters/get', (req, res) => {
  const { token, index } = req.query;
  getCharactersRoute(token, index, res);
});

getCharactersRoute = (token, index, res) => {
  if (index == null) return error(res, 'Missing parameter.');
  else {
    const userId = authorize(token, res);
    if (index === 'all') {
      getAllCharacters(userId, res);
    } else {
      getCharacter(userId, index, res);
    }
  }
};

getAllCharacters = (userId, res) => {
  User.findOne({ _id: userId })
    .populate('characters')
    .exec((err, user) => {
      if (err) return handleError(res);
      else if (!user) return error(res, "Can't find user.");
      else {
        let chars = [];
        user.characters.map(char => {
          if (!char.deleted) {
            chars.push({ name: char.name, index: char.index });
          }
        });
        res.json(chars);
      }
    });
};

getCharacter = (userId, index, res) => {
  Character.findOne(
    {
      _user: new mongoose.Types.ObjectId(userId),
      index: index,
      deleted: false
    },
    (err, character) => {
      if (!character) return error(res, "Can't find character.");
      else {
        res.json({ name: character.name, data: character.data });
      }
    }
  );
};

///////////////////////////////////////////////////////////////////////////////
//    /characters/save
///////////////////////////////////////////////////////////////////////////////

router.post('/characters/save', (req, res) => {
  const { token, index, data } = req.body;
  saveCharacterRoute(token, index, data, res);
});

router.get('/characters/save', (req, res) => {
  const { token, index, data } = req.query;
  saveCharacterRoute(token, index, data, res);
});

saveCharacterRoute = (token, index, data, res) => {
  if (index == null || data == null) return error(res, 'Missing parameter.');
  else {
    const userId = authorize(token, res);
    Character.findOne({
      _user: new mongoose.Types.ObjectId(userId),
      index: index
    }).exec((err, character) => {
      if (err) handleError(err, res);
      character.data = JSON.stringify(data);
      character.name = data.info.name;
      character.save(err => {
        if (err) handleError(err, res);
        else res.json({ success: true, character: character });
      });
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
//    /characters/new
///////////////////////////////////////////////////////////////////////////////

router.post('/characters/new', (req, res) => {
  const { token } = req.body;
  newCharacterRoute(token, res);
});

router.get('/characters/new', (req, res) => {
  const { token } = req.query;
  newCharacterRoute(token, res);
});

newCharacterRoute = (token, res) => {
  const userId = authorize(token, res);
  User.findOne({ _id: userId })
    .populate('characters')
    .exec((err, user) => {
      if (err) handleError(err, res);
      if (!user) return error(res, "Can't find user.");
      else {
        const char = new Character({
          _user: user,
          index: user.characters.length + 1,
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
                    index: char.index
                  }
                });
              }
            });
          }
        });
      }
    });
};

///////////////////////////////////////////////////////////////////////////////
//    /characters/delete
///////////////////////////////////////////////////////////////////////////////

router.post('/characters/delete', (req, res) => {
  const { token, index } = req.body;
  deleteCharacterRoute(token, index, res);
});

router.get('/characters/delete', (req, res) => {
  const { token, index } = req.query;
  deleteCharacterRoute(token, index, res);
});

deleteCharacterRoute = (token, index, res) => {
  if (index == null) return error(res, 'Missing parameter.');
  else {
    const userId = authorize(token, res);
    Character.findOne({
      _user: new mongoose.Types.ObjectId(userId),
      index: index
    }).exec((err, character) => {
      if (err) handleError(err, res);
      character.deleted = true;
      character.save(err => {
        if (err) handleError(err, res);
        else res.json({ success: true, character: character });
      });
    });
  }
};

///////////////////////////////////////////////////////////////////////////////
//    helpers
///////////////////////////////////////////////////////////////////////////////

authorize = (token, res) => {
  let userId;
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, settings.auth.secret, function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }
    userId = decoded._id;
  });
  return userId;
};

error = (res, message) => {
  console.log(message);
};

handleError = (err, res) => {
  res.json(err);
  throw err;
};

module.exports = router;
