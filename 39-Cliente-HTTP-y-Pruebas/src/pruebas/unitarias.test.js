// utilizar mocha, chai y supertest
const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
let ControladorProductos = require('../controladores/productos');

let controladorProductos = new ControladorProductos.ControladorProductos();

describe('test api rest full', () => {

    // beforeEach(() => {
    //     controladorProductos.guardarCambiosEnArchivo([
    //         {
    //             "id": "1",
    //             "timestamp": "",
    //             "nombre": "Escuadra",
    //             "descripcion": "Escuadra para dibujar",
    //             "codigo": "asfgaeasd",
    //             "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    //             "precio": "200",
    //             "stock": "2"
    //         },
    //         {
    //             "id": "2",
    //             "timestamp": "",
    //             "nombre": "Tiza",
    //             "descripcion": "Tiza para escribir",
    //             "codigo": "koasfioho",
    //             "foto": "https://ferramsur.com.ar/wp-content/uploads/2021/03/13620-600x600-600x600.jpg",
    //             "precio": "100",
    //             "stock": "20"
    //         },
    //         {
    //             "timestamp": "",
    //             "nombre": "Regla larga",
    //             "descripcion": "Regla para medir",
    //             "codigo": "koasfioho",
    //             "foto": "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
    //             "precio": "170",
    //             "stock": "10",
    //             "id": 3
    //         }
    //     ]);
    // });

    describe('chai deberia funcionar', () => {
        it('deberia funcionar', () => {
            expect(1).to.be(1);
        });
    });
});