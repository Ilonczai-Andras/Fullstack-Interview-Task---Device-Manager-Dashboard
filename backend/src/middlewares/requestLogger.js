const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} ${url}`);
  next(); // Don't forget to call next() to pass control to the next middleware
};

export default requestLogger;