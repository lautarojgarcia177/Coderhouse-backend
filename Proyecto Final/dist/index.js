"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
// Express
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/public'));
// Rutas
var apiRouter = require('./routes/apiRoutes');
// import apiRouter from './routes/apiRoutes'
app.use('/api', apiRouter);
var mvcRouter = require('./routes/mvcRoutes.js');
app.use('', mvcRouter);
// Websocket
var server = http_1.default.createServer(app);
// Pongo a escuchar el servidor en el puerto indicado
var PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
    console.log("servidor escuchando en http://localhost:" + PORT);
});
// en caso de error, avisar
app.on('error', console.warn);
// Middleware para manejo de errores
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});
module.exports = server;
