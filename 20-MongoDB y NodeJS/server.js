const http = require('http');

// Mongo
require('./database/conexion');

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
const apiRouter = require('./routes/apiRoutes.js');
app.use('/api', apiRouter);

// Websocket
const server = http.createServer(app);
const io = require('./lib/websockets');
io.setup(server);

// Migracion
const migracion = require('./database/migracion.js');
migracion.cargarProductos().then(x => console.log('productos creados', x))

// Pongo a escuchar el servidor en el puerto indicado
const PORT = require('./config/config.json').PORT || 8080;
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