// Base de datos
const { db_mensajes } = require('../database/knex');

async function obtenerMensajes() {
    return db_mensajes('mensajes').select('*');
}

async function agregarMensaje(mensaje) {
    return obtenerMensajes().then(mensajes => {
        mensajes.length === 0 ? (mensaje.id = 1) : (mensaje.id = mensajes.length + 1);
        return db_mensajes('mensajes').insert(mensaje)
    });
}

module.exports = {
    obtenerMensajes,
    agregarMensaje,
};