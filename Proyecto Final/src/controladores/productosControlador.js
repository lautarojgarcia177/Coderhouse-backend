import fs from 'fs';

const pathArchivoProductos = new URL('../persistencia/productos.json', import.meta.url);
    
export function obtenerProductos(callback) {
    return fs.readFile(pathArchivoProductos, 'utf8', (err, productos) => {
        err ? callback(err) : callback(null, JSON.parse(productos))
    })
}

export function obtenerProducto(id, callback) {
    obtenerProductos((err, productos) => {
        if (err) {
            callback(err)
        } else {
            const producto = productos.find(producto => producto.id == id)
            callback(null, producto)
        }
    })
}

export function agregarProducto(producto, callback) {
    let _producto = producto
    obtenerProductos((err, productos) => {
        if (err) {
            callback(err)
        }
        productos.length === 0 ? (_producto.id = 1) : (_producto.id = productos.length + 1)
        productos.push(_producto)
        guardarCambiosEnArchivo(productos, err => {
            err ? callback(err) : callback(null, _producto)
        })
    })
}

export function actualizarProducto(id, producto, callback) {
    obtenerProductos((err, productos) => {
        if (err) {
            callback(err)
        } else {
            const productoActualizado = Object.assign(productos.find(p => p.id == id), producto);
            guardarCambiosEnArchivo(productos, err => err ? callback(err) : callback(null, productoActualizado));
        }
    })
}

export function borrarProducto(id, callback) {
    obtenerProductos((err, productos) => {
        if (err) {
            callback(err)
        } else {
            guardarCambiosEnArchivo(productos.filter(p => p.id != id), err => err ? callback(err) : callback(null));
        }
    })
}

function guardarCambiosEnArchivo(productos, callback) {
    return fs.writeFile(
        pathArchivoProductos,
        JSON.stringify(productos),
        callback
        )
}