var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');

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
          msg: 'Authentication failed. User not found.'
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, isMatch => {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.status(401).send({
              success: false,
              msg: 'Authentication failed. Wrong password.'
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
        message: 'Successful created new user.'
      });
    });
  }
});

module.exports = router;
