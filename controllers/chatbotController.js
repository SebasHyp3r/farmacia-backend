const Producto = require('../models/producto');
const OpenAI = require('openai');

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controlador principal
const responderMensaje = async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ respuesta: 'Por favor, envía un mensaje para procesar.' });
  }

  try {
    // Buscar en el stock primero
    const mensajeLower = mensaje.toLowerCase();
    const productos = await Producto.find();

    const encontrados = productos.filter(p =>
      mensajeLower.includes(p.nombre.toLowerCase())
    );

    if (encontrados.length > 0) {
      const respuestas = encontrados.map(p =>
        `Sí, tenemos "${p.nombre}" con ${p.stock} unidades en stock.`
      );
      return res.json({ respuesta: respuestas.join(' ') });
    }

    // Si no se encuentra en el stock, consulta a OpenAI
    const respuestaIA = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente de farmacia. Puedes responder sobre medicamentos, síntomas comunes, y consejos básicos de salud. Evita diagnósticos médicos.' },
        { role: 'user', content: mensaje }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const respuesta = respuestaIA.choices[0].message.content;
    res.json({ respuesta });

  } catch (error) {
    console.error('Error en el chatbot:', error);
    res.status(500).json({ respuesta: 'Error al procesar el mensaje.', error: error.message });
  }
};

module.exports = { responderMensaje };
