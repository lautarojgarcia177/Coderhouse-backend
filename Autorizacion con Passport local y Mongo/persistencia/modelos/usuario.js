const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: { type: String, max: 20, require: true },
    password: { type: String, require: true }
});

const Usuario = mongoose.model('usuario', schema);

module.exports = Usuario;