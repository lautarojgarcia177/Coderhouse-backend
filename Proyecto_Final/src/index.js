// Environment
import dotenv from 'dotenv'
dotenv.config()

// Express
import express from 'express'
const app = express()

// Rutas
import { apiRouter } from './rutas/apiRouter.js'
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

// Variable booleana de administrador para permisos
export let esAdmin = true