const mongoose = require('mongoose');

const url = require('../config.json').MONGO_URL;

const conexion = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', url);
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error', err);
});

module.exports = conexion;