var express = require("express");
var passport = require("passport");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db_usuarios = require("../persistencia/repositorios/usuarios-repositorio");

router.get("/login", function (req, res, next) {
  return res.render("login");
});

router.post("/login", (req, res) => {
  passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect;
    };

  if (!req.session?.username && !!req.body?.username) {
    const { username } = req.body;
    req.session.username = username;
    return res.send("loginCorrecto");
  } else if (req.session.username) {
    return res.send("loginCorrecto");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/mvc",
    failureRedirect: "/auth/login",
    failureMessage: true,
  })
);

router.get("/logout", function (req, res, next) {
  req.logout();
  return res.redirect("/");
});

router.get("/registrarse", function (req, res, next) {
  return res.render("registrarse");
});

router.post("/registrarse", function (req, res, next) {
  // Hashear la password
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Guardar el usuario nuevo en la base de datos
    if (err) {
      return next(err);
    }
    const newUser = {
      username: req.body.username,
      password: hash,
    };
    db_usuarios
      .create(newUser)
      .then((newUser) => {
        // Redireccionar
        return res.redirect("/mvc");
      })
      .catch((err) => next);
  });
});

// app.delete('/logout', (req, res) => {
//   req.session.destroy();
//   res.send('logout exitoso');
// });

module.exports = router;
