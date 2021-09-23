// utilizar mocha, chai y supertest
const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

var ControladorProductos = require('../controladores/productos').ControladorProductos;
var controladorProductos = new ControladorProductos;

const listadoProductos = [
    {
        "id": "1",
        "timestamp": "",
        "nombre": "Escuadra",
        "descripcion": "Escuadra para dibujar",
        "codigo": "asfgaeasd",
        "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "precio": "200",
        "stock": "2"
    },
    {
        "id": "2",
        "timestamp": "",
        "nombre": "Tiza",
        "descripcion": "Tiza para escribir",
        "codigo": "koasfioho",
        "foto": "https://ferramsur.com.ar/wp-content/uploads/2021/03/13620-600x600-600x600.jpg",
        "precio": "100",
        "stock": "20"
    },
    {
        "timestamp": "",
        "nombre": "Regla larga",
        "descripcion": "Regla para medir",
        "codigo": "koasfioho",
        "foto": "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
        "precio": "170",
        "stock": "10",
        "id": 3
    }
];

const productoAAgregar = {
    timestamp: "",
    nombre: "Regla",
    descripcion: "Regla para medir",
    codigo: "koasfioho",
    foto: "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
    precio: "170",
    stock: "10",
};

const productoAActualizar = {
    timestamp: "",
    nombre: "Regla larga",
    descripcion: "Regla para medir",
    codigo: "koasfioho",
    foto: "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
    precio: "170",
    stock: "10",
};

describe('test api rest full', () => {

    // Reseteo la base de datos antes de cada test
    beforeEach((done) => {
        controladorProductos.guardarCambiosEnArchivo(listadoProductos, done);
    });

    describe('GET', () => {
        it('deberia retornar status 200', async () => {
            let response = await request.get('/api/productos/listar');
            expect(response.status).to.eql(200);
        });
        it('deberia retornar la lista de productos', async () => {
            let response = await request.get('/api/productos/listar');
            expect(response.body).to.eql(listadoProductos);
        });
    });

    describe('POST', () => {

        it('deberia insertar un producto', async () => {
            let response = await request.post('/api/productos/agregar').send(productoAAgregar);
            expect(response.status).to.eql(200);
            expect(response.body.nombre).to.equals(productoAAgregar.nombre);
        });
    });

    describe('PUT', () => {

        before(async () => {
            await request.post('/api/productos/agregar').send(productoAAgregar)
        });

        it('deberia actualizar el producto', async () => {
            let response = await request.put('/api/productos/actualizar/3').send(productoAActualizar);
            expect(response.status).to.eql(200);
            expect(response.body.nombre).to.equals(productoAActualizar.nombre);
        });
    });

    describe('DELETE', () => {
        
        it('deberia eliminar el producto', async () => {
            let response = await request.delete('/api/productos/borrar/2');
            expect(response.status).to.eql(200);
            controladorProductos.obtenerUno(2, (err, item) => {
                expect(item).to.eql(undefined);
            });
        });
    });

});