const notFound = (_req, res, next) => {
  // Do not echo req.originalUrl — it leaks server routing info and could
  // reflect attacker-supplied input back in the error message.
  const error = new Error('Route not found');
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
