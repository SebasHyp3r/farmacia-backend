const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Ruta para registrar empleados
router.post('/register', register);

// Ruta para login de empleados
router.post('/login', login);

// Ruta de prueba (opcional)
router.get('/test', (req, res) => {
  res.send('Ruta de prueba OK');
});

module.exports = router;
