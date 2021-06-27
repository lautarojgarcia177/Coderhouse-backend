import fs from 'fs';

const pathArchivoProductos = new URL('../persistence/products.json', import.meta.url);

class ProductosController {
    #productos;

    constructor() {
        this.productos = fs.readFileSync(pathArchivoProductos, 'utf8', (err, archivoProductos) => {
            if (err) {
                throw new Error(err)
            } else {
                this.productos = JSON.parse(archivoProductos);
            }
        })
    }

    obtenerProductos() {
        return this.productos;
    }

    obtenerProducto(id) {
        return this.productos.find((producto) => producto.id == id);
    }

    agregarProducto(producto) {
        this.productos.length === 0 ? (producto.id = 1) : (producto.id = this.productos.length + 1);
        this.productos.push(producto);
        this.guardarCambiosEnArchivo();
    }

    actualizarProducto(id, producto) {
        const productoAActualizar = this.productos.find(_producto => _producto.id == id);
        if (!!productoAActualizar) {
            const productoActualizado = Object.assign(productoAActualizar, producto);
            this.guardarCambiosEnArchivo();
            return productoActualizado;
        } else {
            return undefined;
        }
    }

    borrarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id != id);
        this.guardarCambiosEnArchivo();
    }

    guardarCambiosEnArchivo() {
        fs.writeFileSync(pathArchivoProductos, JSON.stringify(this.productos), (err) => { if (err) console.error('Error al escribir el archivo de productos') })
    }
}

export const productosController = new ProductosController();