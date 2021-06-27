import express from 'express';
export const routerCarritos = express.Router();

// importo la instancia del controlador
import {carritosController} from '../../controllers/carritosController.js';

// Obtener los productos de un carrito
routerCarritos.get('/listar/:id_carrito', (req, res) => {
    res.json(carritosController.obtenerProductos(req.params.id_carrito));
});

// Insertar un producto al carrito
routerCarritos.post('/agregar/:id_carrito', (req, res) => {
    carritosController.agregarProducto(req.params.id_carrito, req.body);
    res.send('Producto agregado al carrito con éxito');
});

// Quitar un producto de un carrito
routerCarritos.delete('/borrar/:id_carrito', (req, res) => {
    carritosController.borrarProducto(req.params.id, req.body);
    res.send('Si existia el producto en ese carrito, fue eliminado');
});