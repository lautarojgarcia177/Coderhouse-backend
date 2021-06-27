"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routerProductos = express_1.default.Router();
// importo la instancia del controlador
var productos = require('../../controllers/productos');
// Obtener todos los productos
routerProductos.get('/listar', function (req, res) {
    res.json(productos.obtenerProductos());
});
// Obtener un producto
routerProductos.get('/listar/:id', function (req, res) {
    res.json(productos.obtenerProducto(req.params.id));
});
// Insertar un producto
routerProductos.post('/agregar', function (req, res) {
    productos.agregarProducto(req.body);
    res.send('Producto agregado con éxito');
});
// Actualizar un producto
routerProductos.put('/actualizar/:id', function (req, res) {
    var productoActualizado = productos.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});
// Borrar un producto
routerProductos.delete('/borrar/:id', function (req, res) {
    productos.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});
module.exports = routerProductos;
