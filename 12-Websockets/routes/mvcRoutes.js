const express = require('express');
const router = express.Router();

// importo la instancia del controlador
const productos = require('../controlador/productos');

router.get('/', (req, res) => {
    res.render('index', {
        hayProductos: true,
        productos: productos.obtenerProductos(),
    });
});

module.exports = router;