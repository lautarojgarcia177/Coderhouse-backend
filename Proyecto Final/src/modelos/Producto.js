import mongoose from 'mongoose';
const { Schema } = mongoose;

const productoSchema = new Schema({
    id: Number,
    timestamp: Date,
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number
});

export const Producto = mongoose.model('Producto', productoSchema);