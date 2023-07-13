const methodLogger = (req, res, next) => {
  console.log(`Method.Entry, URL: ${req.url} type: ${req.method}`);
  next();
};

module.exports = methodLogger;
