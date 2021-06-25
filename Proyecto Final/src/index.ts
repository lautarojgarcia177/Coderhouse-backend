import http from 'http';

// Express
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
const apiRouter = require('./routes/apiRoutes');
// import apiRouter from './routes/apiRoutes'
app.use('/api', apiRouter);
const mvcRouter = require('./routes/mvcRoutes.js');
app.use('', mvcRouter);

// Websocket
const server = http.createServer(app);

// Pongo a escuchar el servidor en el puerto indicado
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
app.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

module.exports = server;