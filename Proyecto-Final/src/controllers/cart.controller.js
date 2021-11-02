const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cartService } = require('../services');

const getCart = catchAsync(async (req, res) => {
  debugger;
  const user = req.user;
  const cart = await cartService.getCartByUser(req.user);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(cart);
});

const addProductToCart = catchAsync(async (req, res) => {
  debugger;
  // const userId =
  // const cart = await cartService.addProductToCart(req.user, req.body.product, req.body.amount);
  res.send(cart);
});

const removeProductFromCart = catchAsync(async (req, res) => {
  debugger;
  // const userId =
  // const cart = await cartService.addProductToCart(req.user, req.body.product, req.body.amount);
  res.send(cart);
});

module.exports = {
  getCart,
  addProductToCart,
  removeProductFromCart
};
