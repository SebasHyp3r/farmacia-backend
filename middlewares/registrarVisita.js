// middlewares/registrarVisita.js
const Visita = require('../models/Visita');

const registrarVisita = async (req, res, next) => {
  try {
    await Visita.create({
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      ruta: req.originalUrl
    });
  } catch (error) {
    console.error('Error registrando visita:', error.message);
  }
  next();
};

module.exports = registrarVisita;
