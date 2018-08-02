const mongoose = require('mongoose');
const passport = require('passport');
const settings = require('../config/settings');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

router.post('/login', (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(401).send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
        user.comparePassword(req.body.password, isMatch => {
          if (isMatch && !err) {
            const token = jwt.sign(user.toJSON(), settings.auth.secret, {
              expiresIn: settings.auth.expiresIn
            });
            res.json({ success: true, token: token });
          } else {
            res.status(401).send({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    }
  );
});

router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      message: 'Please pass username and password.'
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
          message: 'Username already exists.'
        });
      }
      return res.json({
        success: true,
        message: 'Successfully created new user.'
      });
    });
  }
});

module.exports = router;
