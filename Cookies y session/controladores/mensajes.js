// Base de datos


// Normalizacion
const { normalize, schema } = require('normalizr');
const autorNormalizerSchema = new schema.Entity('autores')
const mensajeNormalizerSchema = new schema.Entity('mensaje',{autor: [autorNormalizerSchema]} )
const mensajesNormalizerSchema = [mensajeNormalizerSchema];

async function obtenerMensajes() {
    return db_mensajes('mensajes').select('*').then(data => {
        data = data.map(mensaje => {
            mensaje.author = JSON.parse(mensaje.author);
            return mensaje;
        });
        return normalize(data, mensajesNormalizerSchema, {idAttribute: 'email'});
    });
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