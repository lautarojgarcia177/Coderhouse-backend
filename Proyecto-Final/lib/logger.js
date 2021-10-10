const log4js = require("log4js");

const log4jsConfig = log4js.configure({
    appenders: {
        consol: { type: "console" },
    },
    categories: {
        default: { appenders: ["consol"], level: "trace" },
        consol: { appenders: ["consol"], level: "debug" },
    }
});

const loggerConsol = log4js.getLogger('consol');

module.exports = {
    log4jsConfig,
    loggerConsol,
}