const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  title: { type: String },
  description: { type: String },
  picture: String,
  price: Number,
  stock: Number
});

module.exports = {
  schema: Product,
  model: mongoose.model('product', Product)
}
