// Base de datos
const db_mensajes = require('../persistencia/repositorios/mensajes-repositorio');

// Normalizacion
const { normalize, schema } = require('normalizr');
const autorNormalizerSchema = new schema.Entity('autores')
const mensajeNormalizerSchema = new schema.Entity('mensaje',{autor: [autorNormalizerSchema]} )
const mensajesNormalizerSchema = [mensajeNormalizerSchema];

async function obtenerMensajes() {
    return db_mensajes.findAll().then(data => {
        data = data.map(mensaje => {
            mensaje.author = JSON.parse(mensaje.author);
            return mensaje;
        });
        return normalize(data, mensajesNormalizerSchema, {idAttribute: 'email'});
    });
}

async function agregarMensaje(mensaje) {
    return db_mensajes.create(mensaje);
}

module.exports = {
    obtenerMensajes,
    agregarMensaje,
};