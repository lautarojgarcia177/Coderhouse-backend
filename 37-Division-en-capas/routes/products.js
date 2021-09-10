const express = require("express");
const router = express.Router();

// importo la instancia del controlador
const productosController = require("../controladores/productos");

// Obtener todos los productos
router.get("/listar", (req, res) => {
  productosController.findAll().then((productos) => {
    console.log(productos);
    res.json(productos);
  });
});

// Obtener un producto
router.get("/listar/:id", (req, res) => {
  productosController
    .findById(req.params.id)
    .then((producto) => res.json(producto));
});

// Insertar un producto
router.post("/guardar", (req, res) => {
  productosController
    .create(req.body)
    .then(() => {
      res.send("Producto guardado con éxito");
    })
    .catch((err) => console.error(err));
});

// Actualizar un producto
router.put("/actualizar/:id", (req, res) => {
  productosController
    .update(req.params.id, req.body)
    .then((productoActualizado) => {
      !!productoActualizado
        ? res.send("Producto actualizado")
        : res.send("No se encontro el producto con el id especificado");
    });
});

// Borrar un producto
router.delete("/borrar/:id", (req, res) => {
  productosController
    .delete(req.params.id)
    .then(res.send("Si existia un producto con ese id, fue eliminado"))
    .catch((err) => res.send("Error al eliminar el producto", err));
});

module.exports = router;
