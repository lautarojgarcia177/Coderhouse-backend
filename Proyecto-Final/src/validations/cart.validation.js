const Joi = require('joi');
const { objectId, password } = require('./custom.validation');

const getCart = {
    params: Joi.object().keys({
        cartId: Joi.string().custom(objectId),
    }),
};

const addProductToCart = {
    body: Joi.object()
        .keys({
            product: Joi.object(),
        })
        .max(1),
};

const removeProductFromCart = {
    body: Joi.object()
        .keys({
            product: Joi.object(),
        })
        .max(1),
}

module.exports = {
    getCart,
    addProductToCart,
    removeProductFromCart
};