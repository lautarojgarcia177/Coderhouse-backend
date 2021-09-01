"use strict";

var http = require('http'); // Express


var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](__dirname + '/public')); // Rutas

var apiRouter = require('./routes/apiRoutes.js');

app.use('/api', apiRouter);

var mvcRouter = require('./routes/mvcRoutes.js');

app.use('', mvcRouter); // Motor de templates

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars'); // Websocket

var server = http.createServer(app);

var io = require('./lib/websockets');

io.setup(server); // Pongo a escuchar el servidor en el puerto indicado

var PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
  console.log("servidor escuchando en http://localhost:".concat(PORT));
}); // en caso de error, avisar

app.on('error', console.warn); // Middleware para manejo de errores

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Hubo un error');
});
module.exports = server;
