var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var sassMiddleware = require('node-sass-middleware');

// Entorno
require('dotenv').config();

// Logs
var loggerConsola = require('./lib/logger').loggerConsola;
loggerConsola.info("Cheese is Comté.")
loggerConsola.warn("Cheese is quite smelly.");
loggerConsola.error("Cheese is too ripe!");
var loggerArchivoAlertas = require('./lib/logger').loggerArchivoAlertas;
loggerArchivoAlertas.info("Cheese is Comté.")
loggerArchivoAlertas.warn("Cheese is quite smelly.");
loggerArchivoAlertas.error("Cheese is too ripe!");
var loggerArchivoErrores = require('./lib/logger').loggerArchivoErrores;
loggerArchivoErrores.info("Cheese is Comté.")
loggerArchivoErrores.warn("Cheese is quite smelly.");
loggerArchivoErrores.error("Cheese is too ripe!");

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Imprimir el codigo de exit
process.on('beforeExit', code => loggerConsola.info('Proceso terminado con código', code));

module.exports = app;
