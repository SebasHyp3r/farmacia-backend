const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: { type: String }, // Ejemplo: "Medicamentos", "Vitaminas", etc.
  fechaVencimiento: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
