const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de templates
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Rutas
const apiRouter = require('./routes/apiRoutes.js');
const mvcRouter = require('./routes/mvcRoutes.js');
app.use('/api', apiRouter);
app.use('/mvc', mvcRouter);

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