const Producto = require('../modelos/producto');
const MongoCRUD = require('./crud');

class ProductosRepositorio extends MongoCRUD {

    constructor() {
        super(Producto);
    }
}

module.exports = new ProductosRepositorio();