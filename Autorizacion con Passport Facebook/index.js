const http = require('http');
const config = require('./config/config.json');
const express = require('express');

// Secrets
 require('dotenv').config();


// Mongo
require('./persistencia/conexion');

// Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: config.TIEMPO_EXPIRACION
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
  }));
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  const passport = require('passport');
  // Passport
  require('./lib/auth')();
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Motor de templates
app.set('view engine', 'pug');

// Websocket
const server = http.createServer(app);
const io = require('./lib/websockets');
io.setup(server);

// Rutas
const authRouter = require('./routes/authRoutes.js');
app.use('/auth', authRouter);
const apiRouter = require('./routes/apiRoutes.js');
app.use('/api', apiRouter);
const mvcRouter = require('./routes/mvcRoutes.js');
app.use('/mvc', mvcRouter);
// Wildcard route
app.get('/*', function(req, res) {
    return res.redirect('/mvc')
});

// Pongo a escuchar el servidor en el puerto indicado
const PORT = process.env.PORT || config.PORT || 8081;
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