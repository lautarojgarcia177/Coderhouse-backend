const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Product = require('./product.model');

const cartProductsSchema = mongoose.Schema(
    {
        product: {
            type: Schema.Types.ObjectId, ref: 'Product',
            required: true,
        },
        amount: {
            type: Number,
            default: 0
        }
    },
    {}
);

const cartSchema = new Schema({
    products: [cartProductsSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {});

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON);
// productSchema.plugin(paginate);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
