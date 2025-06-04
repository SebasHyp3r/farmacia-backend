const axios = require('axios');
const { OpenAI } = require('openai');

require('dotenv').config();

console.log('OPENAI_API_KEY en chatbotController:', process.env.OPENAI_API_KEY ? '[OK]' : '[NO ENCONTRADA]');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handleChat = async (req, res) => {
  const { message } = req.body;

  try {
    // 1. Obtener productos del stock desde tu API
    const response = await axios.get('https://farmacia-backend-1ahx.onrender.com/productos');
    const productos = response.data;

    // 2. Preparar la lista de productos para pasarla a OpenAI
    const listaProductos = productos.map(p => `- ${p.nombre} (S/.${p.precio})`).join('\n');

    // 3. Enviar pregunta y contexto a OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Eres un asistente de farmacia. Estos son los productos disponibles:\n${listaProductos}\nResponde preguntas de los usuarios basándote solo en esta lista.`,
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'gpt-3.5-turbo',
    });

    const respuesta = completion.choices[0].message.content;
    res.json({ respuesta });

  } catch (error) {
  console.error('Error completo:', error);
  if (error.response) {
    console.error('Error response data:', error.response.data);
  }
  res.status(500).json({ error: 'Error procesando la consulta del chatbot.' });
}
};
