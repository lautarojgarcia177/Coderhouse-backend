import express from 'express';
const routerProductos = express.Router();

// importo la instancia del controlador
const productos = require('../../controllers/productos');

// Obtener todos los productos
routerProductos.get('/listar', (req: express.Request, res: express.Response) => {
    res.json(productos.obtenerProductos());
});

// Obtener un producto
routerProductos.get('/listar/:id', (req: express.Request, res: express.Response) => {
    res.json(productos.obtenerProducto(req.params.id));
});

// Insertar un producto
routerProductos.post('/agregar', (req: express.Request, res: express.Response) => {
    productos.agregarProducto(req.body);
    res.send('Producto agregado con éxito');
});

// Actualizar un producto
routerProductos.put('/actualizar/:id', (req: express.Request, res: express.Response) => {
    const productoActualizado = productos.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});

// Borrar un producto
routerProductos.delete('/borrar/:id', (req: express.Request, res: express.Response) => {
    productos.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});

module.exports = routerProductos;