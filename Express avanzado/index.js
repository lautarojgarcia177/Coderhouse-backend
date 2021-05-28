const express = require('express');
const productos = require('./api/productos');

// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// completar el codigo...
app.get('/api/productos/listar', (req, res) => {
    res.json(productos.obtenerProductos());
});

app.get('/api/productos/listar/:id', (req, res) => {
    res.json(productos.obtenerProducto(req.params.id));
});

app.post('/api/productos/guardar', (req, res) => {
    console.log(req.body);
    productos.agregarProducto(req.body);
    res.send('Producto guardado con éxito');
});

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});