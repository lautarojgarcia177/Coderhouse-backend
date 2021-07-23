import express from 'express';
import { CarritosControlador } from '../../controladores/carritosControlador.js'

export const routerCarritos = express.Router()
const controladorCarritos = CarritosControlador

// Obtener un carrito
routerCarritos.get('/listar/:id', (req, res) => {
    controladorCarritos.obtenerCarrito(req.params.id, function(err, productos) {
        if (err) {
            throw new Error(err)
        }
        res.json(productos)
    })
})

// Agregar un producto a un carrito, por defecto inserta en el carrito 1
routerCarritos.post('/agregar/:id_producto', (req, res) => {
    controladorCarritos.agregarProducto('60f208bff200d62a14e281ea', req.params.id_producto, function(err, carrito) {
        if (err) {
            throw new Error(err)
        }
        res.send(carrito)
    })
})

// Quitar un producto de un carrito, por defecto lo quita del carrito 1
routerCarritos.delete('/borrar/:id_producto', (req, res) => {
    controladorCarritos.borrarProducto('60f208bff200d62a14e281ea', req.params.id_producto, function(err, carrito) {
        if (err) {
            throw new Error(err)
        }
        res.send(carrito)
    })
})