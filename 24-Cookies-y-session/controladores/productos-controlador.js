// Base de datos
const db_productos = require('../persistencia/repositorios/productos-repositorio');

async function obtenerProductos() {
    return db_productos.findAll();
}

async function obtenerProducto(id) {
    return db_productos.findById(id);
}

async function agregarProducto(producto) {
    return db_productos.create(producto);
}

async function actualizarProducto(id, producto) {
    return db_productos.update(id, producto);
}

async function borrarProducto(id) {
    return db_productos.remove(id);
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    actualizarProducto,
    borrarProducto,
};