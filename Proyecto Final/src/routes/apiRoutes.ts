import express from 'express';
const router = express.Router();

// importo la instancia del controlador
const productos = require('../controllers/productos');

// Obtener todos los productos
router.get('/productos/listar', (req: express.Request, res: express.Response) => {
    res.json(productos.obtenerProductos());
});

// Obtener un producto
router.get('/productos/listar/:id', (req: express.Request, res: express.Response) => {
    res.json(productos.obtenerProducto(req.params.id));
});

// Insertar un producto
router.post('/productos/agregar', (req: express.Request, res: express.Response) => {
    productos.agregarProducto(req.body);
    res.send('Producto agregado con éxito');
});

// Actualizar un producto
router.put('/productos/actualizar/:id', (req: express.Request, res: express.Response) => {
    const productoActualizado = productos.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});

// Borrar un producto
router.delete('/productos/borrar/:id', (req: express.Request, res: express.Response) => {
    productos.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});

// Obtener todos los productos guardados en un carrito
// router.get('/carrito/listar/:id', (req: express.Request, res: express.Response) => {
//     res.json(productos.obtenerProducto(req.params.id));
// });

module.exports = router;