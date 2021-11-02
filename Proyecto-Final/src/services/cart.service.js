const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a cart
 * @param {Object} user
 * @returns {Promise<Cart>}
 */
const createCart = async (user) => {
    debugger;
    if (await Cart.isAlreadyCreated(user)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Cart already created');
    }
    return Cart.create({ products: [], user: user._doc._id });
};

/**
 * Query for carts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarts = async (filter, options) => {
    const carts = await Cart.paginate(filter, options);
    return carts;
};

/**
 * Get cart by id
 * @param {ObjectId} id
 * @returns {Promise<Cart>}
 */
const getCartById = async (id) => {
    return Cart.findById(id);
};

/**
 * Get cart by userId
 * @param {string} user
 * @returns {Promise<Cart>}
 */
const getCartByUser = async (user) => {
    return Cart.findOne({ user: user._doc._id });
};

/**
 * Update cart by id
 * @param {ObjectId} cartId
 * @param {Object} updateBody
 * @returns {Promise<Cart>}
 */
const updateCartById = async (cartId, updateBody) => {
    const cart = await getCartById(cartId);
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    Object.assign(cart, updateBody);
    await cart.save();
    return cart;
};

/**
 * Delete cart by id
 * @param {ObjectId} cartId
 * @returns {Promise<Cart>}
 */
const deleteCartById = async (cartId) => {
    const cart = await getCartById(cartId);
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    await cart.remove();
    return cart;
};

/**
 * Add product to cart
 * @param {ObjectId} userId
 * @param {ObjectId} productId
 * @param {Number} amount
 * @returns {Promise<Cart>}
 */
const addProductToCart = async (userId, productId, amount) => {
    const cart = await getCartById(cartId);
    if (!cart) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
    }
    Object.assign(cart, updateBody);
    await cart.save();
    return cart;
}

module.exports = {
    createCart,
    queryCarts,
    getCartById,
    getCartByUser,
    updateCartById,
    deleteCartById,
    addProductToCart
};
