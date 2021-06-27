import { Producto } from './productos';

const productosController = require('./productos');
const path = require('path');
const fs = require('fs');

export interface Carrito {
    id: number;
    timestamp: Date;
    productos: Producto[];
}

class CarritosController {
    private carritos: Carrito[];

    constructor() {
        this.carritos = fs.readFileSync(path.resolve('carritos.json'), 'utf8', (err: string, archivoCarritos: any) => {
            if (err) {
                throw new Error(err)
            } else {
                this.carritos = JSON.parse(archivoCarritos) as Carrito[];
            }
        })
    }

    public obtenerProductos(id_carrito: number): Producto[] {
        const carrito: Carrito | undefined = this.carritos.find((carrito: Carrito) => carrito.id === id_carrito);
        if (!!carrito) {
            return carrito?.productos;
        } else {
            return [];
        }
    }

    public agregarProducto(id_carrito: number, producto: Producto): void {
        const carrito = this.carritos.find(carrito => carrito.id === id_carrito);
        if (!!carrito) {
            carrito.productos.push(producto);
            this.guardarCambiosEnArchivo();
        }
    }

    public borrarProducto(id_carrito: number, producto: Producto): void {
        const carrito = this.carritos.find(carrito => carrito.id === id_carrito);
        if (!!carrito) {
            carrito.productos = carrito.productos.filter(p => p.id != producto.id);
        }
        this.guardarCambiosEnArchivo();
    }

    private guardarCambiosEnArchivo(): void {
        fs.writeFileSync(path.resolve('carritos.json'), JSON.stringify(this.carritos), (err: Error) => { if(err) console.error('Error al escribir el archivo de carritos') })
    }
}

module.exports = new CarritosController();