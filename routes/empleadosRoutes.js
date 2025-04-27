const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');

// Crear empleado
router.post('/', async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    await nuevoEmpleado.save();
    res.status(201).json({ mensaje: 'Empleado creado exitosamente', empleado: nuevoEmpleado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear empleado', error: error.message });
  }
});

// Listar empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener empleados', error: error.message });
  }
});

// Actualizar empleado
router.put('/:id', async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleadoActualizado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.json({ mensaje: 'Empleado actualizado exitosamente', empleado: empleadoActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar empleado', error: error.message });
  }
});

// Eliminar empleado
router.delete('/:id', async (req, res) => {
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.json({ mensaje: 'Empleado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar empleado', error: error.message });
  }
});

module.exports = router;
