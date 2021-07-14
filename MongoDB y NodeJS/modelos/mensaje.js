const mongoose = require('mongoose');

const schema = mongoose.Schema({
    text: { type: String, max: 400 },
    user: { type: String, require: true, max: 100 },
    timestamp: { type: Date, default: new Date() },
    _id: String
});

const Mensaje = mongoose.model('mensaje', schema);

module.exports = Mensaje;