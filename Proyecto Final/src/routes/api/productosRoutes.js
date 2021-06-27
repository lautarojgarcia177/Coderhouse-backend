import express from 'express';
export const routerProductos = express.Router();

// importo la instancia del controlador
import { productosController } from '../../controllers/productosController.js';

// Obtener todos los productos
routerProductos.get('/listar', (req, res) => {
    res.json(productosController.obtenerProductos());
});

// Obtener un producto
routerProductos.get('/listar/:id', (req, res) => {
    res.json(productosController.obtenerProducto(req.params.id));
});

// Insertar un producto
routerProductos.post('/agregar', (req, res) => {
    productosController.agregarProducto(req.body);
    res.send('Producto agregado con éxito');
});

// Actualizar un producto
routerProductos.put('/actualizar/:id', (req, res) => {
    const productoActualizado = productosController.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});

// Borrar un producto
routerProductos.delete('/borrar/:id', (req, res) => {
    productosController.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});