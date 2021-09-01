// Autenticacion
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;

let FACEBOOK_CLIENT_ID = process.argv[2] || process.env.FACEBOOK_CLIENT_ID;
let FACEBOOK_CLIENT_SECRET = process.argv[3] || process.env.FACEBOOK_CLIENT_SECRET;

module.exports = function () {
  // configuramos passport para usar facebook
  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/login/callback",
        profileFields: ["id", "displayName", "", "photos", "emails"],
        scope: ["email"],
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(JSON.stringify(profile, null, 3));
        let userProfile = profile;
        return done(null, userProfile);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

};
