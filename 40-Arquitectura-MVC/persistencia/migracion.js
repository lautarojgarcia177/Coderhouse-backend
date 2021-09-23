// Migrar productos
const Producto = require('./modelos/producto');
const productos = require('./db/productos.json');

async function cargarProductos() {
    await Producto.create(productos);
}

//Migrar mensajes
const Mensaje = require('./modelos/mensaje');
const mensajes = require('./db/mensajes.json');
async function cargarMensajes() {
    await Mensaje.create(mensajes);
}

module.exports = {
    cargarProductos,
    cargarMensajes
}