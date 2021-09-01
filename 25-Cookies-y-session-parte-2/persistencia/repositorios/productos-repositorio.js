const Producto = require('../modelos/producto');
const MongoCRUD = require('./crud');

class ProductosController extends MongoCRUD {

    constructor() {
        super(Producto);
    }
}

module.exports = new ProductosController();