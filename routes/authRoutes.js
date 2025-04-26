console.log("authRoutes cargado correctamente");

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Ruta de prueba
router.get('/test', (req, res) => {
    res.send('Ruta de prueba OK');
});

// Ruta para registrar empleados
router.post('/register', register);

// Ruta para login de empleados
router.post('/login', login);

module.exports = router;
