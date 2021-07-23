const express = require("express");
const router = express.Router();

// importo la instancia del controlador
const productosController = require("../controladores/productos");

// Mock de productos
router.get("/productos/vista-test", (req, res) => {
  res.json(productosController.mockDeProductos(req.params.cant));
});

// Obtener todos los productos
router.get("/productos/listar", (req, res) => {
  productosController.findAll().then((productos) => {
    res.json(productos);
  });
});

// Obtener un producto
router.get("/productos/listar/:id", (req, res) => {
  productosController
    .findById(req.params.id)
    .then((producto) => res.json(producto));
});

// Insertar un producto
router.post("/productos/guardar", (req, res) => {
  productosController
    .create(req.body)
    .then(() => {
      res.send("Producto guardado con éxito");
    })
    .catch((err) => console.error(err));
});

// Actualizar un producto
router.put("/productos/actualizar/:id", (req, res) => {
  productosController
    .update(req.params.id, req.body)
    .then((productoActualizado) => {
      !!productoActualizado
        ? res.send("Producto actualizado")
        : res.send("No se encontro el producto con el id especificado");
    });
});

// Borrar un producto
router.delete("/productos/borrar/:id", (req, res) => {
  productosController
    .delete(req.params.id)
    .then(res.send("Si existia un producto con ese id, fue eliminado"))
    .catch((err) => res.send("Error al eliminar el producto", err));
});

module.exports = router;
