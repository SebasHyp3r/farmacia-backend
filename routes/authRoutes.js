console.log("authRoutes cargado correctamente");
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.get('/test', (req, res) => {
    res.send('Ruta de prueba OK');
});

// Estas son tus rutas reales:
router.post('/register', register);
router.post('/login', login);

module.exports = router;
