const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: String,
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: "empleado" }
});

module.exports = mongoose.model('Empleado', empleadoSchema);
