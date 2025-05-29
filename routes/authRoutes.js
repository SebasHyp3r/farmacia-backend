const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Registro de usuario (admin o usuario)
router.post('/register', register);

// Login usuario/admin
router.post('/login', login);

module.exports = router;
