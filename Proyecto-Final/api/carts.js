const Cart = require('../models/cart');
const MongoCRUD = require('../repository/crud');

class CartsController extends MongoCRUD {
    constructor() {
        super(Cart);
    }
}

module.exports = new CartsController();