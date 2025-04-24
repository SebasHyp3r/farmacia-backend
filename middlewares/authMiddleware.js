const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token' });
  }

  try {
    const tokenLimpio = token.replace('Bearer ', '');
    const verificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
    req.usuario = verificado; // Guarda los datos del usuario en la request
    next(); // Continúa con la ruta protegida
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificarToken;
