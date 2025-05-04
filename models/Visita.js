const mongoose = require('mongoose');

const visitaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  ip: String,
  userAgent: String
});

module.exports = mongoose.model('Visita', visitaSchema);
