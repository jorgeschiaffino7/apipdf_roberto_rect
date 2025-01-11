const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error interno del servidor' });
  };
  
  module.exports = errorHandler;
  