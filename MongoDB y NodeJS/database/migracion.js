// Migrar productos
const Producto = require('../modelos/producto');
const productos = require('./productos.json');
export async function cargarProductos() {
    await Producto.create(productos);
}

//Migrar mensajes
const Mensaje = require('../modelos/mensaje');
const mensajes = require('./productos.json');
export async function cargarMensajes() {
    await Mensaje.create(mensajes);
}

