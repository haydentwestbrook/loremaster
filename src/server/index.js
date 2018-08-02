const express = require('express');
const os = require('os');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const passport = require('passport');

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
  res.redirect('/');
});
app.listen(settings.port, () =>
  console.log('Listening on port ' + settings.port + '!')
);
