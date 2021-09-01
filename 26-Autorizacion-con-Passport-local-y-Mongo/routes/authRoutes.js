const express = require("express");
const router = express.Router();
const passport = require('passport');

//  LOGIN
router.get('/login', getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLogin);
router.get('/faillogin', getFaillogin);

//  SIGNUP
router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignup);
router.get('/failsignup', getFailsignup);

function getLogin(req, res) {
  if (req.isAuthenticated()) {

    var user = req.user;
    console.log('user logueado');
    res.render('principal', {
      username: user.username,
    });
  }
  else {
    res.render('login');
  }
}

function getSignup(req, res) {
    res.render('registrarse');
}


function postLogin (req, res) {
  var user = req.user;
  //console.log(user);

  //grabo en user fecha y hora logueo
  res.render('principal');
}

function postSignup (req, res) {
  var user = req.user;
  //console.log(user);

  //grabo en user fecha y hora logueo
  res.render('principal');
}

function getFaillogin (req, res) {
  console.log('error en login');
  res.render('login-error', {
  });
}

function getFailsignup (req, res) {
  console.log('error en signup');
  res.render('signup-error', {
  });
}



function getLogout (req, res) {
  req.logout();
  res.render('login');
}

function failRoute(req, res){
  res.status(404).render('routing-error', {});
}

module.exports = router;
