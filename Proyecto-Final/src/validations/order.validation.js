const Joi = require('joi');
const { objectId, password } = require('./custom.validation');

const confirmOrder = {
    body: Joi.object()
        .keys({
            cart: Joi.required().custom(objectId),
        })
        .min(1)
        .max(1)
};

module.exports = {
    confirmOrder,
};