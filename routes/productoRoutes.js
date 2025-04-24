const express = require('express');
const Producto = require('../models/producto');
const verificarToken = require('../middlewares/authMiddleware'); // ✅ Importamos el middleware

const router = express.Router();

// Obtener todos los productos (protegido)
router.get('/', verificarToken, async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).send('Error al obtener los productos');
  }
});

// Crear un nuevo producto (protegido)
router.post('/', verificarToken, async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  try {
    await nuevoProducto.save();
    res.status(201).send('Producto creado');
  } catch (err) {
    res.status(500).send('Error al crear el producto');
  }
});

// Actualizar un producto (protegido)
router.put('/:id', verificarToken, async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.send('Producto actualizado');
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
});

// Eliminar un producto (protegido)
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.send('Producto eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
});

module.exports = router;
