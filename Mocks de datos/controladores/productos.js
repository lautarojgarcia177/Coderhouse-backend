const Producto = require('../modelos/producto');
const MongoCRUD = require('../repositorio/crud');
const faker = require('faker');

class ProductosController extends MongoCRUD {

    constructor() {
        super(Producto);
    }

    mockDeProductos(cantidadDeProductosAGenerar = 10) {
        let productosMock = [];
        for(let i = 0; i < cantidadDeProductosAGenerar; i++) {
            productosMock.push({
                title: faker.name.title(),
                price: faker.finance.amount(),
                thumbnail: faker.image.imageUrl(),
                stock: faker.random.alphaNumeric()
            });
        }
        return productosMock;
    }
}

module.exports = new ProductosController();