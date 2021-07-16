import { ProductosControlador } from './productosControlador.js'
import { Fabrica } from '../fabrica/index.js'

class _CarritosControlador {
    constructor() {
        this.persistencia = Fabrica
        this.DAOCarritos = this.persistencia.crearDAOs('carrito')
        this.controladorProductos = ProductosControlador
    }

    obtenerCarrito(id_carrito, callback) {
        return this.DAOCarritos.obtenerUno(id_carrito, callback)
    }

    obtenerProductosDeCarrito(id_carrito, callback) {
        return this.DAOCarritos.obtenerUno(id_carrito, (err, carrito) => {
            if (err) {
                callback(err)
            } else {
                callback(null, carrito.productos)
            }
        })
    }

    obtenerProductoDeCarrito(id_carrito, id_producto, callback) {
        this.obtenerProductosDeCarrito(id_carrito, (err, productos) => {
            if (err) {
                callback(err)
            } else {
                callback(null, productos.find(p => p.id == id_producto))
            }
        })
    }

    agregarProducto(id_carrito, id_producto, callback) {
        this.controladorProductos.obtenerProducto(id_producto, (err, producto) => {
            if (err) {
                callback(err)
            } else {
                this.DAOCarritos.obtenerTodos((err, carritos) => {
                    if (err) {
                        callback(err)
                    } else {
                        const carrito = carritos.find(carrito => carrito.id == id_carrito)
                        if (!!producto) {
                            carrito.productos.push(producto);
                            this.guardarCambiosEnArchivo(carritos, err => {
                                err ? callback(err) : callback(null, carrito)
                            })
                        } else {
                            callback(null, carrito)
                        }
                    }
                })
            }
        })
    }

    borrarProducto(id_carrito, id_producto, callback) {
        this.DAOCarritos.obtenerTodos((err, carritos) => {
            if (err) {
                callback(err)
            } else {
                const carrito = carritos.find(carrito => carrito.id == id_carrito)
                const productoAEliminar = carrito.productos.find(p => p.id == id_producto)
                carrito.productos.splice(carrito.productos.indexOf(productoAEliminar), 1)
                this.guardarCambiosEnArchivo(carritos, err => {
                    err ? callback(err) : callback(null, carrito)
                })
            }
        })
    }

    obtenerCarritos(callback) {
        return this.DAOCarritos.obtenerTodos(callback)
    }

    guardarCambiosEnArchivo(carritos, callback) {
        return this.DAOCarritos.guardarCambiosEnArchivo(carritos, callback)
    }

}

export const CarritosControlador = new _CarritosControlador()