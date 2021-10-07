const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var productSchema = require('./product').schema;

const Cart = new Schema({
    products: [ productSchema ],
    timestamp: { type: Date, default: new Date() }
});

module.exports = mongoose.model('cart', Cart);
