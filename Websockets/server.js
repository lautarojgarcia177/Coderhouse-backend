const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Le pasamos la constante http a socket.io
const io = require('socket.io')(http);

// Motor de templates
app.set('view engine', 'ejs');

// Rutas
const apiRouter = require('./routes/apiRoutes.js');
app.use('/api', apiRouter);
const mvcRouter = require('./routes/mvcRoutes.js');
app.use('', mvcRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
server.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

module.exports = server;