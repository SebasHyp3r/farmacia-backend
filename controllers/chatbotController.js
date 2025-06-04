const Producto = require('../models/producto');

// Función que busca productos en base al texto del usuario
const responderMensaje = async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ respuesta: 'Por favor, envía un mensaje para procesar.' });
  }

  try {
    // Convertimos el mensaje a minúsculas
    const mensajeLower = mensaje.toLowerCase();

    // Buscamos si alguna palabra del mensaje coincide con un producto
    const productos = await Producto.find();

    const encontrados = productos.filter(p =>
      mensajeLower.includes(p.nombre.toLowerCase())
    );

    if (encontrados.length > 0) {
      const respuestas = encontrados.map(p =>
        `Sí, tenemos "${p.nombre}" con ${p.stock} unidades en stock.`
      );
      res.json({ respuesta: respuestas.join(' ') });
    } else {
      res.json({ respuesta: 'Lo siento, no encontré ese producto en nuestro stock.' });
    }
  } catch (error) {
    res.status(500).json({ respuesta: 'Error al procesar el mensaje.', error: error.message });
  }
};

module.exports = { responderMensaje };
