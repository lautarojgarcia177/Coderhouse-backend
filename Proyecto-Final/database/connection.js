// module of connection to the database.
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const consoleLogger = require('../lib/logger').loggerConsole;

const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    consoleLogger.info('[Mongoose] - connected in:', url);
});

mongoose.connection.on('error', (err) => {
    consoleLogger.info('[Mongoose] - error:', err);
});

module.exports = connection;