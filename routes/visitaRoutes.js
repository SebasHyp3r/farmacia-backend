const express = require('express');
const router = express.Router();
const Visita = require('../models/Visita');

// Obtener todas las visitas
router.get('/', async (req, res) => {
  try {
    const visitas = await Visita.find().sort({ fecha: -1 });
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo visitas' });
  }
});

// Eliminar todas las visitas
router.delete('/', async (req, res) => {
  try {
    await Visita.deleteMany();
    res.json({ mensaje: 'Todas las visitas eliminadas' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando visitas' });
  }
});

// Filtrar visitas por IP
router.get('/ip/:ip', async (req, res) => {
  try {
    const visitas = await Visita.find({ ip: req.params.ip }).sort({ fecha: -1 });
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ error: 'Error filtrando visitas por IP' });
  }
});

module.exports = router;
