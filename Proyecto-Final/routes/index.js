const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'profile_pictures/' });

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/register", (req, res) => {
  res.render("register", {});
});

router.get('/profile', (req, res, next) => {
  res.render("profile", { user: req.user });
});

router.get('/products', (req, res, next) => {
  res.render("products", { user: req.user });
});

router.post("/register", upload.single("photo"), (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      address: req.body.address,
      age: req.body.age,
      phone: req.body.phone,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.render("register", { error: err.message });
      }
      // Upload profile picture
      console.log(req.file);

      passport.authenticate("local")(req, res, () => {
        req.session.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  );
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user, error: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res, next) => {
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/ping", (req, res) => {
  res.status(200).send("pong!");
});

module.exports = router;
