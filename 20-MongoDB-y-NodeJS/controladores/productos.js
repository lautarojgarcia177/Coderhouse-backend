const Producto = require('../modelos/producto');
const MongoCRUD = require('../repositorio/crud');

class ProductosController extends MongoCRUD {

    constructor() {
        super(Producto);
    }
}

module.exports = new ProductosController();