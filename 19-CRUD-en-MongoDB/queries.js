/* db
use ecommerce */

/* Agregar 10 documentos */
db.productos.insertMany([
    {
        "title": "Escuadra",
        "price": "123.45",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    },
    {
        "title": "Calculadora",
        "price": "234.56",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    },
    {
        "title": "Globo Terráqueo",
        "price": "345.67",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
    },
    {
        "title": "Calculadora",
        "price": "234.56",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    },
    {
        "title": "Tiza",
        "price": "150",
        "thumbnail": "https://th.bing.com/th/id/OIP.Yq3VSiVMSu7Q1WgEOCxaHAHaHa?w=185&h=184&c=7&o=5&dpr=1.25&pid=1.7"
    },
    {
        "title": "Block de hojas",
        "price": "200",
        "thumbnail": "data:image/jpeg;base64,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"
    },
    {
        "title": "Set lapiceras",
        "price": "300",
        "thumbnail": "https://th.bing.com/th/id/OIP.BNCKyCOEhbjXevGfg-2UwQHaEK?w=313&h=180&c=7&o=5&dpr=1.25&pid=1.7"
    },
    {
        "title": "Goma de borrar",
        "price": "30",
        "thumbnail": "https://th.bing.com/th/id/OIP.N9epc7DHO9idrG5iJWzviAHaHa?w=197&h=197&c=7&o=5&dpr=1.25&pid=1.7",
    },
    {
        "title": "Voligoma",
        "price": "50",
        "thumbnail": "https://th.bing.com/th/id/OIP.3UTHWlFRkIwsFDkfmr8nKwHaHa?w=206&h=206&c=7&o=5&dpr=1.25&pid=1.7",
    },
    {
        "title": "Cartuchera",
        "price": "400",
        "thumbnail": "https://th.bing.com/th/id/R.396633a19a02a265c94b842e587c95d0?rik=4gPWFqrQ%2bN4fug&riu=http%3a%2f%2fwww.misutiles.com%2f5575-thickbox_default%2fcartuchera-de-jean-rectangular-grande.jpg&ehk=mqamJY%2fNxmsO2jRnWWFdaJgPWyE3FNmFys74uY44YMY%3d&risl=&pid=ImgRaw",
    }
])

db.mensajes.insertMany([
{"author":"lautaroxg10@gmail.com","text":"Hola!","fyh":"6/24/2021"},
{"author":"jperez@gmail.com","text":"Hola, Todo bien?","fyh":"6/24/2021"},
{"author":"lautaroxg10@gmail.com","text":"Si, todo bien por suerte","fyh":"6/24/2021"},
{"author":"jperez@gmail.com","text":"Me alegro :)","fyh":"6/24/2021"},
{"author":"jperez@gmail.com","text":"La familia como anda?","fyh":"6/24/2021"},
{"author":"lautaroxg10@gmail.com","text":"Bien por suerte, la perra la llevamos a castrar hace poco","fyh":"6/24/2021"},
{"author":"jperez@gmail.com","text":"Huy pobrecita pero bueno mejor que sea asi","fyh":"6/24/2021"},
{"author":"lautaroxg10@gmail.com","text":"Si tal cual, asi ya no atrae tanto a los perros","fyh":"6/24/2021"},
{"author":"jperez@gmail.com","text":"Se vuelve un problema sino, bueno che te dejo un gusto","fyh":"6/24/2021"},
{"author":"lautaroxg10@gmail.com","text":"Igualmente, que te vaya bien, saludos!","fyh":"6/24/2021"}
])

/* Listar todos los documentos */
db.productos.find()
db.mensajes.find()

/* Mostrar la cantidad de documentos almacenados en cada colección */
db.productos.count()
db.mensajes.count()

/* CRUD */
    /* Agregar un producto mas */
    db.productos.insertOne({
            "title": "Tijera",
            "price": "500",
        "thumbnail": "https://th.bing.com/th/id/OIP.6XJ3BCCEf9kClmViEAO2rQHaHa?w=214&h=214&c=7&o=5&dpr=1.25&pid=1.7"
    })
    /* Consultar un producto por nombre */
        /* Con precio menor a 100 */
        db.productos.find({ price: { $lt: 1000 } }, { title: 1 })
        /* Con precio menor a 3000 y mayor a 1000 */
        db.productos.find({ price: { $gt: 1000, $lt: 3000} }, { title: 1 })
        /* Con precio mayor a 3000 */
        db.productos.find({ price: { $gt: 3000 } }, { title: 1 })
        /* Tercer producto más barato */
        db.productos.find({}, { title: 1}).sort({ price: 1 }).skip(2).limit(1)
    /* Agregar el campo stock a todos los productos con un valor de 100 */
    db.productos.updateMany({}, {$set: { stock: 100 }})
    /* Cambiar el stock a cero de los productos con precio mayor a 4000 pesos*/
    db.productos.updateMany({ price: { $gt: 4000} }, {$set: { stock: 0 }})
    /* Borrar los productos con precio menor a 1000 pesos */
    db.productos.deleteMany({ price: { $lt: 1000} })

/* Crear un usuario */
db.createUser({
    user: 'pepe',
    pwd: 'asd456',
    roles: [
        { role: 'read', db: 'ecommerce' }
    ]
})
