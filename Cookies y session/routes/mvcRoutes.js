const express = require("express");
const router = express.Router();

// importo la instancia del controlador
const productosControlador = require("../controladores/productos-controlador");

router.get("/login", (req, res) => {
  console.log(req.session?.username);
  res.render("login", {
    title: "Login",
  });
});

router.get("/", (req, res) => {
  productosControlador.obtenerProductos().then((productos) => {
    res.render("principal", {
      title: "Vista de Productos",
      hayProductos: true,
      productos: productos,
    });
  });
});

module.exports = router;
