const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server.';

  res.status(statusCode).json({
    message: message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
};

export default errorHandler;