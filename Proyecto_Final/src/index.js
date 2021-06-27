// Environment
import dotenv from 'dotenv'
dotenv.config();

// Express
import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
import * as controladorProductos from './controladores/productosControlador.js'

// Obtener todos los productos
app.get('/api/productos/listar', (req, res) => {
  controladorProductos.obtenerProductos(function(err, productos) {
    if (err) {
      throw new Error(err)
    }
    res.json(productos)
  })
})

// Obtener un producto
app.get('/api/productos/listar/:id', (req, res) => {
  controladorProductos.obtenerProducto(req.params.id, function(err, producto) {
    if (err) {
      throw new Error(err)
    }
    res.json(producto)
  })
})

// Insertar un producto
app.post('/api/productos/agregar', (req, res) => {
  controladorProductos.agregarProducto(req.body, function(err, producto) {
    if (err) {
      throw new Error(err)
    }
    res.json(producto)
  })
})

// Actualizar un producto
app.put('/api/productos/actualizar/:id', (req, res) => {
  controladorProductos.actualizarProducto(req.params.id, req.body, function(err, producto) {
    if (err) {
      throw new Error(err)
    }    
    res.json(producto)
  })
})

// Borrar un producto
app.delete('/api/productos/borrar/:id', (req, res) => {
  controladorProductos.borrarProducto(req.params.id, function(err) {
    if (err) {
      throw new Error(err)
    }
    res.send('Si existia un producto con ese id, fue eliminado')
  })
})

const port = process.env.PORT || 8080
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// en caso de error, avisar
app.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

// Variable booleana de administrador para permisos
let isAdmin = true;