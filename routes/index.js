var express = require('express');
var router = express.Router();
var user = require('../models/user')
var passport = require('passport');
var Strategy = require('passport-local').Strategy;



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  user.find().then(function(err,data) {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
});

router.post('/create', function(req,res,next) {
  user.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function(err,data) {
    if(err) {
      res.send(err)
    } else{
      res.send(data)
    }
  })
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.send('Welcome User!')
  }
);

// FACEBOOK
router.get('/auth/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {

  }
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(res.req.user);
  });

// TWITTER
router.get('/auth/twitter',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {

  }
);

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send(res.req.user);
  });

// GOOGLE
router.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),

  function(req, res) {
    // Successful authentication, redirect home.
    res.send(res.req.user)
  }
);


module.exports = router;
