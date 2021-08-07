// Autenticacion
const passport = require("passport");
const bCrypt = require("bCrypt");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../persistencia/modelos/usuario");

module.exports = function () {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  // passport/login.js

  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        // check in mongo if a user with username exists or not
        Usuario.findOne({ username: username }, function (err, user) {
          // In case of any error, return using the done method
          if (err) return done(err);
          // Username does not exist, log error & redirect back
          if (!user) {
            console.log("Usuario Not Found with username " + username);
            return done(
              null,
              false,
              //req.flash('message', 'Usuario Not found.'));
              console.log("message", "Usuario Not found.")
            );
          }
          // Usuario exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            console.log("Invalid Password");
            return done(
              null,
              false,
              //req.flash('message', 'Invalid Password'));
              console.log("message", "Invalid Password")
            );
          }
          // Usuario and password both match, return user from
          // done method which will be treated like success
          return done(null, user);
        });
      }
    )
  );

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        findOrCreateUser = function () {
          // find a user in Mongo with provided username
          Usuario.findOne({ username: username }, function (err, user) {
            // In case of any error return
            if (err) {
              console.log("Error in SignUp: " + err);
              return done(err);
            }
            // already exists
            if (user) {
              console.log("Usuario already exists");
              return done(
                null,
                false,
                //req.flash('message','Usuario Already Exists'));
                console.log("message", "Usuario Already Exists")
              );
            } else {
              // if there is no user with that email
              // create the user
              var newUser = new Usuario();
              // set the user's local credentials
              newUser.username = username;
              newUser.password = createHash(password);

              // save the user
              newUser.save(function (err) {
                if (err) {
                  console.log("Error in Saving user: " + err);
                  throw err;
                }
                console.log("Usuario Registration succesful");
                return done(null, newUser);
              });
            }
          });
        };
        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
      }
    )
  );
  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    Usuario.findById(id, function (err, user) {
      done(err, user);
    });
  });

};
