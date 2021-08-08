const express = require("express");
const router = express.Router();

// importo la instancia del controlador
const productosControlador = require("../controladores/productos-controlador");


router.get("/", checkAuthentication, (req, res) => {
  productosControlador.obtenerProductos().then((productos) => {
    return res.render("principal", {
      title: "Vista de Productos",
      hayProductos: true,
      productos: productos,
      // username: req.session?.username
    });
  });
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.status(401).send('debe autenticarse primero');
  }
}

module.exports = router;
