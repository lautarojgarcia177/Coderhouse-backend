import express from 'express';
const routerCarrito = express.Router();

// importo la instancia del controlador
const carritos = require('../../controllers/carritos');

// Obtener los productos de un carrito
routerCarrito.get('/listar/:id_carrito', (req: express.Request, res: express.Response) => {
    res.json(carritos.obtenerProductos(req.params.id_carrito));
});

// Insertar un producto al carrito
routerCarrito.post('/agregar/:id_carrito', (req: express.Request, res: express.Response) => {
    carritos.agregarProducto(req.params.id_carrito, req.body);
    res.send('Producto agregado al carrito con éxito');
});

// Quitar un producto de un carrito
routerCarrito.delete('/borrar/:id_carrito', (req: express.Request, res: express.Response) => {
    carritos.borrarProducto(req.params.id, req.body);
    res.send('Si existia el producto en ese carrito, fue eliminado');
});

module.exports = routerCarrito;