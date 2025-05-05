const mongoose = require('mongoose');

const visitaSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  ruta: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visita', visitaSchema);
