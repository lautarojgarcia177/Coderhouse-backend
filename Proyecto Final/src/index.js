// Environment
import dotenv from 'dotenv'
dotenv.config();

// Express
import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));

// Rutas
import { apiRouter } from './routes/api/apiRouter.js';
app.use('/api', apiRouter);

// Pongo a escuchar el servidor en el puerto indicado
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
app.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

// Variable booleana de administrador para permisos
let isAdmin = true;