/**
 * endpoints.js - declaro las rutas asociadas a los endpoints
 */

const express = require('express');
const router = express.Router();

// instancio el controlador
const Productos = require('../api/productos');
const productos = new Productos();

// Obtener todos los productos
router.get('/productos/listar', (req, res) => {
    res.json(productos.obtenerProductos());
});

// Obtener un producto
router.get('/productos/listar/:id', (req, res) => {
    res.json(productos.obtenerProducto(req.params.id));
});

// Insertar un producto
router.post('/productos/guardar', (req, res) => {
    productos.agregarProducto(req.body);
    res.send('Producto guardado con éxito');
});

// Actualizar un producto
router.put('/productos/actualizar/:id', (req, res) => {
    const productoActualizado = productos.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});

// Borrar un producto
router.delete('/productos/borrar/:id', (req, res) => {
    productos.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});

module.exports = router;