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

mongoose.Promise = bluebird;
mongoose
  .connect(
    'mongodb://localhost/users',
    { promiseLibrary: require('bluebird') }
  )
  .then(() => console.log('connection succesful'))
  .catch(err => console.error(err));

const app = express();

app.use(express.static('dist'));
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.use('/', auth);
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.status(404).redirect('/');
});
app.listen(8080, () => console.log('Listening on port 8080!'));
