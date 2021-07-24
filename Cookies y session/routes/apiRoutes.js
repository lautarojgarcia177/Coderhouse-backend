const express = require('express');
const router = express.Router();

// importo la instancia del controlador
const productosController = require('../controladores/productos-controlador');

router.post('/login', (req, res) => {
    if(!req.session?.username && !!req.body?.username) {
        const {username} = req.body;
        req.session.username = username;
        res.send('loginCorrecto');
    } else if (req.session.username) {
        res.send('loginCorrecto');
    }  
});

// Obtener todos los productos
router.get('/productos/listar', (req, res) => {
    productosController.obtenerProductos().then(productos => {
        console.log(productos);
        res.json(productos);
    })
});

// Obtener un producto
router.get('/productos/listar/:id', (req, res) => {
    res.json(productosController.obtenerProducto(req.params.id));
});

// Insertar un producto
router.post('/productos/guardar', (req, res) => {
    productosController.agregarProducto(req.body)
        .then(() => {
            res.send('Producto guardado con éxito');
        })
        .catch(err => console.error(err));
});

// Actualizar un producto
router.put('/productos/actualizar/:id', (req, res) => {
    const productoActualizado = productosController.actualizarProducto(req.params.id, req.body);
    !!productoActualizado ? res.send('Producto actualizado') : res.send('No se encontro el producto con el id especificado');
});

// Borrar un producto
router.delete('/productos/borrar/:id', (req, res) => {
    productosController.borrarProducto(req.params.id);
    res.send('Si existia un producto con ese id, fue eliminado');
});

module.exports = router;