const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product').model;
const User = require('./user');

const cartProductsSchema = new Schema({
   product: { type: Schema.Types.ObjectId, ref: 'Product' },
   amount: { type: Number, default: 0 }
});
const CartProducts = mongoose.model('CartProducts', cartProductsSchema);

const cartSchema = new Schema({
    products: [ { type: Schema.Types.ObjectId, ref: 'CartProducts'} ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;