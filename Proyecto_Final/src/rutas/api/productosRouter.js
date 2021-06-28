import express from 'express';
import * as controladorProductos from '../../controladores/productosControlador.js'
import {esAdmin} from '../../index.js'

export const routerProductos = express.Router();

// Obtener todos los productos
routerProductos.get('/listar', (req, res) => {
    controladorProductos.obtenerProductos(function(err, productos) {
      if (err) {
        throw new Error(err)
      }
      res.json(productos)
    })
  })
  
// Obtener un producto
routerProductos.get('/listar/:id', (req, res) => {
  controladorProductos.obtenerProducto(req.params.id, function(err, producto) {
    if (err) {
      throw new Error(err)
    }
    res.json(producto)
  })
})
  
// Insertar un producto
routerProductos.post('/agregar', (req, res) => {
  if (esAdmin) {
    controladorProductos.agregarProducto(req.body, function(err, producto) {
      if (err) {
        throw new Error(err)
      }
      res.json(producto)
    })
  } else {
    res.status(403)
    res.send('Disponible solo para administradores')
  }
})
  
// Actualizar un producto
routerProductos.put('/actualizar/:id', (req, res) => {
  if (esAdmin) {
    controladorProductos.actualizarProducto(req.params.id, req.body, function(err, producto) {
      if (err) {
        throw new Error(err)
      }    
      res.json(producto)
    })
  } else {
    res.status(403)
    res.send('Disponible solo para administradores')
  }
})

// Borrar un producto
routerProductos.delete('/borrar/:id', (req, res) => {
  if (esAdmin) {
    controladorProductos.borrarProducto(req.params.id, function(err) {
      if (err) {
        throw new Error(err)
      }
      res.send('Si existia un producto con ese id, fue eliminado')
    })
  } else {
    res.status(403)
    res.send('Disponible solo para administradores')
  }
})