// Base de datos
const db = require('../database/knex');

async function obtenerProductos() {
    return db('productos').select('*');
}

async function obtenerProducto(id) {
    return obtenerProductos().then(productos => {
        return productos.find((producto) => producto.id == id);
    });
}

async function agregarProducto(producto) {
    obtenerProductos().then(productos => {
        productos.length === 0 ? (producto.id = 1) : (producto.id = productos.length + 1);
        db('productos').insert(producto).then(() => {
            return Promise.resolve('Producto agregado con éxito');
        });
    });
}

//     actualizarProducto(id, producto) {
//         const productoAActualizar = this.productos.find(_producto => _producto.id == id);
//         if (!!productoAActualizar) {
//             return Object.assign(productoAActualizar, producto);
//         } else {
//             return undefined;
//         }
//     }

//     borrarProducto(id) {
//         this.productos = this.productos.filter(producto => producto.id != id);
//     }
// }

module.exports = {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
};