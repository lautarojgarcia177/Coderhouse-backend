const logger = require('../config/logger');

const logBody = (req, res, next) => {
  logger.info('Request body', req.body);
  next();
};

module.exports = {
  logBody
}