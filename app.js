var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session')

var index = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose') // harus di inisialisasi manual
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/login') // harus di inisialisasi manual

var passport = require('passport')
var Strategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;


var app = express();

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'rahasia',
  key: 'sid',
  resave: false,
  saveUninitialized: true
}))
app.use('/', index);
app.use('/users', users);


// LOCAL STRATEGY
passport.use(new Strategy(
  function(username, password, cb) {
    if (username == 'irwin' && password == '123') {
      cb(null, "callback")
    } else {
      cb("Wrong Username or Password!")
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, "user.id");
});


// FACEBOOK STRATEGY
passport.use(new FacebookStrategy({
    clientID: '242959629497536',
    clientSecret: 'b8c01fad0e2205f48b902fabe8054b14',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      // return cb(err, user);
    // });
    // console.log(profile);
    return cb(null, profile);
  }
));

// TWITTER STRATEGY
passport.use(new TwitterStrategy({
    consumerKey: 'WjlMAkd8oU42bUyhaq3PwQu9q',
    consumerSecret: 'CluwoNDTmxrBLLQbHq11ar04ldXCuvK2AC8EewkkQ4kqcyHZhw',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, profile)
  }
));


// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: '16452008929-mqgehhprg35o31aanpnfeihubrkj1cmu.apps.googleusercontent.com',
    clientSecret: 'TGdm4KEQZL1CKXZtYPkRJecY',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    // console.log(profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, profile)
  }
));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
