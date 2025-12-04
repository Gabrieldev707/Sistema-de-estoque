const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`Rota não encontrada: ${req.originalUrl}`);
  res.status(404);
  next(error); // Passa o erro para o seu errorMiddleware global
};

module.exports = notFoundMiddleware;