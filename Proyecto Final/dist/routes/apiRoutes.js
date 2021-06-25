"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// importo la instancia del controlador
var productos = require('../controllers/productos');
// Obtener todos los productos
router.get('/productos/listar', function (req, res) {
    res.json(productos.obtenerProductos());
});
// Obtener un producto
router.get('/productos/listar/:id', function (req, res) {
    res.json(productos.obtenerProducto(req.params.id));
});
// Insertar un producto
router.post('/productos/agregar', function (req, res) {
    productos.agregarProducto(req.body);
    res.send('Producto agregado con éxito');
});
// Actualizar un producto
router.put('/productos/actualizar/:id', function (req, res) {
    var productoActualizado = productos.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});
// Borrar un producto
router.delete('/productos/borrar/:id', function (req, res) {
    productos.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});
// Obtener todos los productos guardados en un carrito
// router.get('/carrito/listar/:id', (req: express.Request, res: express.Response) => {
//     res.json(productos.obtenerProducto(req.params.id));
// });
module.exports = router;
