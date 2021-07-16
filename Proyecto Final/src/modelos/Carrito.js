import mongoose from 'mongoose';
const { Schema } = mongoose;

const carritoSchema = new Schema({
    id: Number,
    timestamp: Date,
    productos: [
        new Schema({
            id: Number,
            timestamp: Date,
            nombre: String,
            descripcion: String,
            codigo: String,
            foto: String,
            precio: Number,
            stock: Number
        })
    ]
});

export const Carrito = mongoose.model('Carrito', carritoSchema);