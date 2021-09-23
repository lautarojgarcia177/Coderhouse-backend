// Environment
var dotenv = require('dotenv');
dotenv.config()

// Express
var express = require('express');
const app = express()
// Rutas
var apiRouter = require('./rutas/apiRouter').apiRouter;
app.use('/api', apiRouter)

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// en caso de error, avisar
app.on('error', console.warn)

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Hubo un error')
})