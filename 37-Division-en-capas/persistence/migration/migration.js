// Migrar productos
const Producto = require("../models/product");
const productos = require("./products.json");
async function cargarProductos() {
  await Producto.create(productos);
}

//Migrar mensajes
const Mensaje = require("../models/message");
const mensajes = require("./messages.json");
async function cargarMensajes() {
  await Mensaje.create(mensajes);
}

module.exports = {
  cargarProductos,
  cargarMensajes,
};
