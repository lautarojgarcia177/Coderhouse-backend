const express = require("express");
const router = express.Router();

// importo la instancia del controlador
const productosControlador = require("../controladores/productos-controlador");

router.use(function(req, res, next) {
  if (req.url != '/login' && !req.session?.username) {
    return res.redirect('/mvc/login');
  }
  next();
});

router.get("/login", (req, res) => {
    return res.render("login", {
      title: "Login"
    });
});

router.get("/", (req, res) => {
  productosControlador.obtenerProductos().then((productos) => {
    return res.render("principal", {
      title: "Vista de Productos",
      hayProductos: true,
      productos: productos,
      username: req.session?.username
    });
  });
});

module.exports = router;
