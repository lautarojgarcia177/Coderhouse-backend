const logBody = (req, res, next) => {
  console.log('request body', req.body);
  next();
};

module.exports = {
  logBody
}