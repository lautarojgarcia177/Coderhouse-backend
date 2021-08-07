const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: { type: String, max: 20 },
    password: { type: String},
});

const Usuario = mongoose.model('usuario', schema);

module.exports = Usuario;