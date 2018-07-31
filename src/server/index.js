const express = require('express');
const os = require('os');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bluebird = require('bluebird');
const jwt = require('jsonwebtoken');

const settings = require('./config/settings');
const auth = require('./routes/auth');
const characters = require('./routes/characters');

mongoose.Promise = bluebird;
mongoose
  .connect(
    'mongodb://localhost',
    { promiseLibrary: require('bluebird') }
  )
  .then(() => console.log('connection succesful'))
  .catch(err => console.error(err));

const app = express();

app.use(express.static('dist'));
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());
app.use('/api', auth);
app.use('/api', characters);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: '404 error' });
});
app.listen(settings.port, () =>
  console.log('Listening on port ' + settings.port + '!')
);
