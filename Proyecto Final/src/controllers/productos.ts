interface Producto {
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

class Productos {
    private productos: Producto[];

    constructor() {
        this.productos = [
            {
                id: 0,
                timestamp: new Date(2021, 5, 25, 19, 15, 30),
                nombre: 'Calculadora',
                descripcion: 'Calculadora marca Casio modelo CK250',
                codigo: '6v5epngy',
                foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
                precio: 234.56,
                stock: 2
            },
            {
                id: 1,
                timestamp: new Date(2021, 5, 25, 19, 15, 30),
                nombre: 'Globo Terráqueo',
                descripcion: 'Globo terraqueo marca maped mapamundi',
                codigo: 'puef3rof',
                foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
                precio: 345.67,
                stock: 4
            },
        ];
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
    }

    public actualizarProducto(id: number, producto: Producto): Producto | undefined {
        const productoAActualizar = this.productos.find(_producto => _producto.id == id);
        if (!!productoAActualizar) {
            return Object.assign(productoAActualizar, producto);
        } else {
            return undefined;
        }
    }

    public borrarProducto(id: number): void {
        this.productos = this.productos.filter(producto => producto.id != id);
    }
}

module.exports = new Productos();