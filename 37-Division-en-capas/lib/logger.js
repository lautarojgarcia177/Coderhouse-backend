const log4js = require("log4js");

const log4jsConfig = log4js.configure({
    appenders: {
        consola: { type: "console" },
    },
    categories: {
        default: { appenders: ["consola"], level: "trace" },
        info: { appenders: ["consola"], level: "debug" },
        alert: { appenders: ["consola"], level: "warn" },
        error: { appenders: ["consola"], level: "error" },
    }
});

module.exports = log4js.getLogger('consola');

