console.log("authRoutes cargado correctamente")
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.get('/test', (req, res) => {
    res.send('Ruta de prueba OK');
  });
  
  app.post('/api/auth/register', (req, res) => {
    res.send('Registro temporal funcionando');
  });
  
// Ruta para registrar empleados
router.post('/register', register);

// Ruta para login de empleados
router.post('/login', login);

module.exports = router;
