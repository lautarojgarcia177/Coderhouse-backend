import {productosController} from './productosController.js';
import fs from 'fs';

const pathArchivoCarritos = new URL('../persistence/carritos.json', import.meta.url);

class CarritosController {
    #carritos;

    constructor() {
        this.carritos = fs.readFileSync(pathArchivoCarritos, 'utf8', (err, archivoCarritos) => {
            if (err) {
                throw new Error(err)
            } else {
                this.carritos = JSON.parse(archivoCarritos);
            }
        })
    }

    obtenerProductos(id_carrito) {
        const carrito = this.carritos.find((carrito) => carrito.id === id_carrito);
        if (!!carrito) {
            return carrito?.productos;
        } else {
            return [];
        }
    }

    agregarProducto(id_carrito, producto) {
        const carrito = this.carritos.find(carrito => carrito.id === id_carrito);
        if (!!carrito) {
            carrito.productos.push(producto);
            this.guardarCambiosEnArchivo();
        }
    }

    borrarProducto(id_carrito, producto) {
        const carrito = this.carritos.find(carrito => carrito.id === id_carrito);
        if (!!carrito) {
            carrito.productos = carrito.productos.filter(p => p.id != producto.id);
        }
        this.guardarCambiosEnArchivo();
    }

    guardarCambiosEnArchivo() {
        fs.writeFileSync(pathArchivoCarritos, JSON.stringify(this.carritos), (err) => { if (err) console.error('Error al escribir el archivo de carritos') })
    }
}

export const carritosController = new CarritosController();