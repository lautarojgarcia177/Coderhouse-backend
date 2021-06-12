const http = require('http');

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
const apiRouter = require('./routes/apiRoutes.js');
app.use('/api', apiRouter);
const mvcRouter = require('./routes/mvcRoutes.js');
app.use('', mvcRouter);

// Motor de templates
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Websocket
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// importo la instancia del controlador
const productos = require('./controlador/productos.js');
io.on('connection', socket => {
    console.log('a user connected');
    socket.on('insertarProducto', producto => {
        productos.agregarProducto(producto);
        io.emit('actualizarListado', productos.obtenerProductos());
    });
});


// Pongo a escuchar el servidor en el puerto indicado
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
app.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

module.exports = server;