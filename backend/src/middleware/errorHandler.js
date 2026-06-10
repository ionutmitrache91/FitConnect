export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = status === 500 ? 'Something went wrong on the server.' : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ message });
}

