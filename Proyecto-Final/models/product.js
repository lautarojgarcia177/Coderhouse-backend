const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String },
  description: { type: String },
  timestamp: { type: Date, default: new Date() },
  code: String,
  picture: String,
  price: Number,
  stock: Number
});

module.exports = {
  schema: Product,
  model: mongoose.model('product', Product)
}
