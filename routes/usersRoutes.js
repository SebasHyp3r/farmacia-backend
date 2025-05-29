const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verificarToken, soloAdmin } = require('../middlewares/authMiddleware');

// Ruta protegida, solo admins pueden listar usuarios
router.get('/', verificarToken, soloAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

module.exports = router;
