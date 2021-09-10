module.exports = function () {
  // Mongo
  require("../persistence/connection");
  // Migracion
  const migracion = require("../persistence/migration/migration.js");
  migracion.cargarProductos().then(() => {});
};
