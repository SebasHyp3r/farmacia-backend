const Producto = require('../models/producto');
const { OpenAI } = require('openai');
require('dotenv').config();

// Configura el cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const responderMensaje = async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ respuesta: 'Por favor, envía un mensaje para procesar.' });
  }

  try {
    const mensajeLower = mensaje.toLowerCase();
    const productos = await Producto.find();

    const encontrados = productos.filter(p =>
      mensajeLower.includes(p.nombre.toLowerCase())
    );

    // Si se encontraron productos, responder con stock y un saludo cordial
    if (encontrados.length > 0) {
      const respuestas = encontrados.map(p =>
        `Tenemos "${p.nombre}" con ${p.stock} unidades disponibles.`
      );

      return res.json({
        respuesta: `¡Hola! Gracias por contactarnos. ${respuestas.join(' ')} ¿En qué más puedo ayudarte?`
      });
    }

    // Si no se encontraron productos, responder con OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: mensaje }],
      model: 'gpt-3.5-turbo',
    });

    const respuestaIA = completion.choices[0].message.content;

    return res.json({
      respuesta: `¡Hola! 😊 Gracias por tu consulta. ${respuestaIA}`
    });

  } catch (error) {
    console.error('Error al responder mensaje:', error.message);
    return res.status(500).json({
      respuesta: 'Hubo un error al procesar tu mensaje.',
      error: error.message,
    });
  }
};

module.exports = { responderMensaje };
