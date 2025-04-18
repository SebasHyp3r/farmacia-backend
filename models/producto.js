const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  fecha_ingreso: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
