const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');
const {cartService} = require('.');

/**
 * Create an order
 * @param {Object} user
 * @param {Object} cart
 * @returns {Promise<Order>}
 */
const confirmOrder = async (user, cart) => {
    const order = await Order.create({ cart: cart._doc._id, userEmail: user._doc.email });
    if (order) {
        await cartService.confirmCart(user);
    } else {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Order could not be created');
    }
};

module.exports = {
    confirmOrder,
};
