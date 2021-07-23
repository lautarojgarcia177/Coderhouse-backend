const http = require('http');

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Motor de templates
app.set('view engine', 'pug');

// Rutas
const apiRouter = require('./routes/apiRoutes.js');
app.use('/api', apiRouter);
const mvcRouter = require('./routes/mvcRoutes.js');
app.use('/mvc', mvcRouter);

// Mongo
require('./persistencia/conexion');

// Websocket
const server = http.createServer(app);
const io = require('./lib/websockets');
io.setup(server);

// Pongo a escuchar el servidor en el puerto indicado
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// Migracion
const migracion = require('./persistencia/migracion.js');
// migracion.cargarProductos().then(x => console.log('productos creados', x))

// en caso de error, avisar
app.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

module.exports = server;