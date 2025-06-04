const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Ruta POST para el chatbot
router.post('/', chatbotController.responderMensaje);

module.exports = router;
