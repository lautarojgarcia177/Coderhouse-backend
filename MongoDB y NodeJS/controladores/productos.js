const Producto = require('../modelos/mensaje');
const MongoCRUD = require('../repositorio/crud');

class ProductoController extends MongoCRUD {

    constructor() {
        super(Producto);
    }
}

module.exports = new ProductoController();