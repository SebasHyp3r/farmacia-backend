const express = require('express');
const router = express.Router();
const Visita = require('../models/Visita');

// Ruta para obtener visitas
router.get('/', async (req, res) => {
  try {
    const visitas = await Visita.find().sort({ fecha: -1 });
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo visitas' });
  }
});

module.exports = router;
