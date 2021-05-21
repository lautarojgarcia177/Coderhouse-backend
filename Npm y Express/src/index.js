import express from 'express';
import * as fs from 'fs';
import random_item from './utils.js';

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port}`)
});
server.on('error', console.log);

// Consigna 1
let acumulador1 = 0;
app.get('/items', (req, res) => {
    acumulador1++;
    // Obtener el listado de productos
    fs.promises.readFile('src/productos.txt', 'utf-8').then(productos => {
        productos = JSON.parse(productos);
        // Agregarle la propiedad cantidad para ver la cantidad de productos
        productos.cantidad = productos.length;
        console.log(productos);
        res.send(productos);
    });
});

// Consigna 2
let acumulador2 = 0;
app.get('/item', (req, res) => {
    acumulador2++;
    fs.promises.readFile('./productos', 'utf-8').then(productos => {
        productos = JSON.parse(productos);
        // Obtengo un producto al azar del array y lo devuelvo
        res.json({
            item: random_item(productos)
        });
    });
});

// Consigna 3
app.get('/visitas', (req, res) => {
    res.json({
        visitas: {
            items: acumulador1,
            item: acumulador2
        }
    });
})