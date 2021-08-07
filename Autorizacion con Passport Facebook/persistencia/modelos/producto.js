const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  price: Number,
  thumbnail: String,
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;