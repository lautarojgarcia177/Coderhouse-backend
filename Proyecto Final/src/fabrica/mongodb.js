import fs from "fs";
import Crud from "../repositorio/crud.js";
import { Producto } from "../modelos/Producto.js";
import { Carrito } from '../modelos/Carrito.js';
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const uri = `mongodb://localhost:27017/ecommerce`;

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(
    import.meta.url); // construct the require method
const productos = require("../db/json/productos.json"); // use the require method
const pathArchivoItems = new URL("../db/json/productos.json",
    import.meta.url);
const carritos = require("../db/json/productos.json"); // use the require method
const pathArchivoCarritos = new URL(
    "../db/json/carritos.json",
    import.meta.url
);

export class MongoDB extends Crud {
    constructor(modelo) {
        if (modelo == "producto") {
            // this.pathArchivoDB = pathArchivoItems
            modelo = Producto;
        } else if (modelo == "carrito") {
            // this.pathArchivoDB = pathArchivoCarritos
            modelo = Carrito
        }
        super(modelo);
        this.connect();
    }

    async connect() {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongoose conectado en ${uri}`);
        // Migracion
        // await this.modelo.create(productos)
        // this.modelo.find({}).then(() => {}).catch(err => console.log('hubo error :(:(:('))
        // await this.modelo.create(carritos)
        // this.modelo.find({}).then(() => {}).catch(err => console.log('hubo error :(:(:('))
        return;
    }

    obtenerTodos(callback) {
        this.modelo
            .find({})
            .then((items) => callback(null, items))
            .catch((err) => callback(err, null));
    }

    obtenerUno(id, callback) {
        this.modelo
            .findById(id)
            .then((item) => callback(null, item))
            .catch((err) => callback(err, null));
    }

    agregarUno(item, callback) {
        this.modelo
            .create(item)
            .then((producto) => callback(null, producto))
            .catch((err) => callback(err, null));
    }

    actualizarItem(id, item, callback) {
        this.modelo
            .findByIdAndUpdate(id, item)
            .then((producto) => callback(null, producto))
            .catch((err) => callback(err, null));
    }

    borrarItem(id, callback) {
        this.modelo
            .findByIdAndDelete(id)
            .then((producto) => callback(null, producto))
            .catch((err) => callback(err, null));
    }
}