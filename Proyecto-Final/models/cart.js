const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const cartProductsSchema = new Schema({
   product: { type: String },
   amount: { type: Number, default: 0 }
});
// const CartProducts = mongoose.model('CartProducts', cartProductsSchema);

const cartSchema = new Schema({
    products: [ cartProductsSchema ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;