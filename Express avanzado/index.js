const express = require('express');
const productos = require('./api/productos');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/productos/listar', (req, res) => {
    res.json(productos.obtenerProductos());
});

app.get('/api/productos/listar/:id', (req, res) => {
    res.json(productos.obtenerProducto(req.params.id));
});

app.post('/api/productos/guardar', (req, res) => {
    productos.agregarProducto(req.body);
    res.send('Producto guardado con éxito');
});

const server = app.listen(8080, () => console.log(`servidor escuchando en http://localhost:${puerto}`));

// en caso de error, avisar
server.on('error', console.warn);