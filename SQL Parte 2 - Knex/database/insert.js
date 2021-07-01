const knex = require('./knex');

async function insertarProducto(producto) {
    return knex('productos').insert(producto);
}

module.exports = {
    insertarProducto
}