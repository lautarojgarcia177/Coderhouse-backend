const Product = require('../models/product').model;
const MongoCRUD = require('../repository/crud');

class ProductsController extends MongoCRUD {
    constructor() {
        super(Product);
    }
}

module.exports = new ProductsController();