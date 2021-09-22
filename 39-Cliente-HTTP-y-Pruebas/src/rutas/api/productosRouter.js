import express from "express";
import { ControladorProductos } from "../../controladores/productos.js";

export const routerProductos = express.Router();

var controladorProductos = new ControladorProductos();

// Obtener todos los productos
routerProductos.get("/listar", (req, res) => {
  controladorProductos.obtenerTodos(function (err, productos) {
    if (err) {
      throw new Error(err);
    }
    res.json(productos);
  });
});

// Obtener un producto
routerProductos.get("/listar/:id", (req, res) => {
  controladorProductos.obtenerUno(req.params.id, function (err, producto) {
    if (err) {
      throw new Error(err);
    }
    res.json(producto);
  });
});

// Insertar un producto
routerProductos.post("/agregar", (req, res) => {
  controladorProductos.agregarUno(req.body, function (err, producto) {
    if (err) {
      throw new Error(err);
    }
    res.json(producto);
  });
});

// Actualizar un producto
routerProductos.put("/actualizar/:id", (req, res) => {
  controladorProductos.actualizarItem(
    req.params.id,
    req.body,
    function (err, producto) {
      if (err) {
        throw new Error(err);
      }
      res.json(producto);
    }
  );
});

// Borrar un producto
routerProductos.delete("/borrar/:id", (req, res) => {
  controladorProductos.borrarItem(req.params.id, function (err) {
    if (err) {
      throw new Error(err);
    }
    res.send("Si existia un producto con ese id, fue eliminado");
  });
});
