const knex = require('../database/knex');

// Productos
function crearTablaProductos() {
    knex.schema.createTable('productos', table => {
        table.increments('id');
        table.string('title');
        table.decimal('price');
        table.string('thumbnail');
    }).then(() => {
        //Popular la tabla con valores iniciales
        knex('productos')
        .insert([{
            title: "Escuadra",
            price: 123.45,
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            id: 1,
        },
        {
            title: "Calculadora",
            price: 234.56,
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
            id: 2,
        },
        {
            title: "Globo Terráqueo",
            price: 345.67,
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            id: 3,
        },
    ]).then(() => {
        console.log('tabla de productos creada y populada')
    });
    }).catch(error => {
        console.error('error: ', error);
    }).finally(() => {
        console.log('cerrando conexion...');
        process.exit(0);
    });
}


// Mensajes
// knex.schema.createTable('productos', table => {
//     table.increments('id');
//     table.string('title');
//     table.decimal('price');
//     table.string('thumbnail');
// }).then(() => {
//     console.log('Tabla de productos creada!');
// }).catch(error => {
//     console.error('error: ', error);
// }).finally(() => {
//     console.log('cerrando conexion...');
//     process.exit(0);
// });



// knex.schema.createTable('mensajes', table => {
//     table.increments('id');
//     table.string('mensaje');
//     table.string('email');
//     table.timestamp('fecha', { useTz: true }).notNullable().defaultTo(knex.fn.now());
// }).then(() => {
//     console.log('tabla mensajes creada!');
// }).catch(error => {
//     console.log('error:', error);
//     throw error;
// }).finally(() => {
//     console.log('cerrando conexion...');
//     process.exit(0);
// });

module.exports = {
    crearTablaProductos
}