const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db_usuarios = require("../persistencia/repositorios/usuarios-repositorio");

module.exports = function () {
  passport.use(
    new Strategy(function (username, password, callback) {
      // Buscar el usuario en la bd
      db_usuarios.findOne({ username: username }).then(user => {
        if (!user) {
          return callback(null, false);
        }

        // Verificar la contraseña
        if (!bcrypt.compareSync(password, user.password)) {
          return callback(null, false);
        }

        return callback(null, user);
      })
      .catch(err => callback);
    })
  );

  // Persistir la auth entre de HTTP requests
  passport.serializeUser(function (user, callback) {
    process.nextTick(function () {
      callback(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, callback) {
    process.nextTick(function () {
      return callback(null, user);
    });
  });
};
