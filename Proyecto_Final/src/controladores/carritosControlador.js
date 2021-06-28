import fs from "fs"
import * as controladorProductos from './productosControlador.js'

const pathArchivoCarritos = new URL(
  "../persistencia/carritos.json",
  import.meta.url
);

function obtenerCarrito(id_carrito, callback) {
    obtenerCarritos((err, carritos) => {
        if (err) {
            callback(err)
        } else {
            const carrito = carritos.find(carrito => carrito.id == id_carrito)
            callback(null, carrito)
        }
    })
}

export function obtenerProductosDeCarrito(id_carrito, callback) {
    obtenerCarrito(id_carrito, (err, carrito) => {
        if (err) {
            callback(err)
        } else {
            callback(null, carrito.productos)
        }
    })
}

export function obtenerProductoDeCarrito(id_carrito, id_producto, callback) {
    obtenerProductosDeCarrito(id_carrito, (err, productos) => {
        if (err) {
            callback(err)
        } else {
            callback(null, productos.find(p => p.id == id_producto))
        }
    })
}

export function agregarProducto(id_carrito, id_producto, callback) {
    controladorProductos.obtenerProducto(id_producto, (err, producto) => {
        if (err) {
            callback(err)
        } else {
            obtenerCarritos((err, carritos) => {
                if (err) {
                    callback(err)
                } else {
                    const carrito = carritos.find(carrito => carrito.id == id_carrito)
                    if (!!producto) {
                        carrito.productos.push(producto);
                        guardarCambiosEnArchivo(carritos, err => {
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


export function borrarProducto(id_carrito, id_producto, callback) {
    obtenerCarritos((err, carritos) => {
        if (err) {
            callback(err)
        } else {
            const carrito = carritos.find(carrito => carrito.id == id_carrito)
            const productoAEliminar = carrito.productos.find(p => p.id == id_producto)
            carrito.productos.splice(carrito.productos.indexOf(productoAEliminar), 1)
            guardarCambiosEnArchivo(carritos, err => {
                err ? callback(err) : callback(null, carrito)
            })
        }
    })
}

function obtenerCarritos(callback) {
  return fs.readFile(pathArchivoCarritos, "utf8", (err, productos) => {
    err ? callback(err) : callback(null, JSON.parse(productos));
  });
}

function guardarCambiosEnArchivo(carritos, callback) {
  return fs.writeFile(pathArchivoCarritos, JSON.stringify(carritos), callback);
}
