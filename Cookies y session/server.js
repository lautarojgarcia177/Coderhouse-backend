const http = require('http');

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Security https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
// const helmet = require('helmet');
// app.use(helmet());

// Motor de templates
app.set('view engine', 'pug');

// Session
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        expires: 60000
    }
}));
app.use(function(req, res, next) {
    // refrescar la duracion de la cookie en cada request
    const minute = 60000;
    req.session.cookie.expires = new Date(Date.now() + minute);
    req.session.cookie.maxAge = minute;
    next();
});


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
    return res.status(500).send('Hubo un error');
});

module.exports = server;