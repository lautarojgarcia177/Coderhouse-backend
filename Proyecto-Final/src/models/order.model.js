const mongoose = require('mongoose');
const { toJSON, paginate, autoincrement } = require('./plugins');
const Cart = require('./cart.model');
const AutoIncrementPlugin = require('auto-increment-plugin').AutoIncrementPlugin;

const orderSchema = mongoose.Schema(
    {
        cart: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Cart',
            required: true,
        },
        number: {
            type: Number,
        },
        state: {
            type: String,
            default: 'Sent'
        },
        userEmail: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);
orderSchema.plugin(AutoIncrementPlugin, {
    model_name: 'Order',
    field: 'number'
})

/**
 * Check if name is taken
 */
orderSchema.statics.isNameTaken = async function (name, excludeOrderId) {
    const order = await this.findOne({ name, _id: { $ne: excludeOrderId } });
    return !!order;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
