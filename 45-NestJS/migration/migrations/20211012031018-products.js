var initialProducts = [
  {
    "title": "Escuadra",
    "price": "123.45",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "stock": 100
  },
  {
    "title": "Calculadora",
    "price": "234.56",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "stock": 100
  },
  {
    "title": "Globo Terráqueo",
    "price": "345.67",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "stock": 100
  },
  {
    "title": "Calculadora",
    "price": "234.56",
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "stock": 100
  },
  {
    "title": "Tiza",
    "price": "150",
    "thumbnail": "https://th.bing.com/th/id/OIP.Yq3VSiVMSu7Q1WgEOCxaHAHaHa?w=185&h=184&c=7&o=5&dpr=1.25&pid=1.7",
    "stock": 100
  },
  {
    "title": "Set lapiceras",
    "price": "300",
    "thumbnail": "https://th.bing.com/th/id/OIP.BNCKyCOEhbjXevGfg-2UwQHaEK?w=313&h=180&c=7&o=5&dpr=1.25&pid=1.7",
    "stock": 100
  },
  {
    "title": "Goma de borrar",
    "price": "30",
    "thumbnail": "https://th.bing.com/th/id/OIP.N9epc7DHO9idrG5iJWzviAHaHa?w=197&h=197&c=7&o=5&dpr=1.25&pid=1.7",
    "stock": 100
  },
  {
    "title": "Voligoma",
    "price": "50",
    "thumbnail": "https://th.bing.com/th/id/OIP.3UTHWlFRkIwsFDkfmr8nKwHaHa?w=206&h=206&c=7&o=5&dpr=1.25&pid=1.7",
    "stock": 100
  },
  {
    "title": "Cartuchera",
    "price": "400",
    "thumbnail": "https://th.bing.com/th/id/R.396633a19a02a265c94b842e587c95d0?rik=4gPWFqrQ%2bN4fug&riu=http%3a%2f%2fwww.misutiles.com%2f5575-thickbox_default%2fcartuchera-de-jean-rectangular-grande.jpg&ehk=mqamJY%2fNxmsO2jRnWWFdaJgPWyE3FNmFys74uY44YMY%3d&risl=&pid=ImgRaw",
    "stock": 100
  },
  {
    "title": "Tijera",
    "price": "500",
    "thumbnail": "https://th.bing.com/th/id/OIP.6XJ3BCCEf9kClmViEAO2rQHaHa?w=214&h=214&c=7&o=5&dpr=1.25&pid=1.7",
    "stock": 100
  }
];

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('products').insertMany(initialProducts);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
