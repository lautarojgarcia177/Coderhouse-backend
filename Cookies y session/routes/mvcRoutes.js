const express = require('express');
const router = express.Router();

// importo la instancia del controlador
const productos = require('../controladores/productos');

router.get('/', (req, res) => {
    res.render('principal', {
        title: 'Vista de Productos',
        hayProductos: true,
        productos: productos.obtenerProductos(),
    });
});

module.exports = router;