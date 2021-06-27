const fs: fs= require('fs')
const path = require('path')
export interface Producto {
    id: number;
    timestamp: Date;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
}

/*
 Las date las trabajo de esta forma:
Año, Mes, Dia, Hora, Minuto, Segundo
Tener cuidado con los meses porque empieza de 0. Junio es 0 y Diciembre es 11 
*/
class ProductosController {
    private productos: Producto[];

    constructor() {
        this.productos = fs.readFileSync(path.resolve('products.json'), 'utf8', (err: string, archivoProductos: any) => {
            if (err) {
                throw new Error(err)
            } else {
                this.productos = JSON.parse(archivoProductos) as Producto[];
            }
        })
    }

    public obtenerProductos(): Producto[] {
        return this.productos;
    }

    public obtenerProducto(id: number): Producto | undefined {
        return this.productos.find((producto) => producto.id == id);
    }

    public agregarProducto(producto: Producto): void {
        this.productos.length === 0 ? (producto.id = 1) : (producto.id = this.productos.length + 1);
        this.productos.push(producto);
        this.guardarCambiosEnArchivo();
    }

    public actualizarProducto(id: number, producto: Producto): Producto | undefined {
        const productoAActualizar = this.productos.find(_producto => _producto.id == id);
        if (!!productoAActualizar) {
            const productoActualizado = Object.assign(productoAActualizar, producto);
            this.guardarCambiosEnArchivo();
            return productoActualizado;
        } else {
            return undefined;
        }
    }

    public borrarProducto(id: number): void {
        this.productos = this.productos.filter(producto => producto.id != id);
        this.guardarCambiosEnArchivo();
    }

    private guardarCambiosEnArchivo(): void {
        fs.writeFileSync(path.resolve('products.json'), JSON.stringify(this.productos), (err: Error) => { if(err) console.error('Error al escribir el archivo de productos') })
    }
}

module.exports = new ProductosController();