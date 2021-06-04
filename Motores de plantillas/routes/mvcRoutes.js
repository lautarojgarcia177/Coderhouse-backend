const express = require('express');
const router = express.Router();

const productos = require('../modelo/productos');

router.get('/productos/vista', (req, res) => {
    const listado = productos.obtenerProductos();
    res.render('vista', {
        hayProductos: true,
        productos: listado,
    });
});

module.exports = router;