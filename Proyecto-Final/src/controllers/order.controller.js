const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const confirmOrder = catchAsync(async (req, res) => {
    const order = await orderService.confirmOrder(req.user);
    res.send(order);
});

module.exports = {
    confirmOrder,
};
