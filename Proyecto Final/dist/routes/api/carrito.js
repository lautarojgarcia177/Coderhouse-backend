"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routerCarrito = express_1.default.Router();
// importo la instancia del controlador
var carritos = require('../../controllers/carritos');
// Obtener los productos de un carrito
routerCarrito.get('/listar/:id_carrito', function (req, res) {
    res.json(carritos.obtenerProductos(req.params.id_carrito));
});
// Insertar un producto al carrito
routerCarrito.post('/agregar/:id_carrito', function (req, res) {
    carritos.agregarProducto(req.params.id_carrito, req.body);
    res.send('Producto agregado al carrito con éxito');
});
// Quitar un producto de un carrito
routerCarrito.delete('/borrar/:id_carrito', function (req, res) {
    carritos.borrarProducto(req.params.id, req.body);
    res.send('Si existia el producto en ese carrito, fue eliminado');
});
module.exports = routerCarrito;
