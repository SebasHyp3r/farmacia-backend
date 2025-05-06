const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Crear app
const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Middleware para registrar visitas
const registrarVisita = require('./middlewares/registrarVisita');
app.use(registrarVisita);

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const visitaRoutes = require('./routes/visitaRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/visitas', visitaRoutes);

// Modelo Visita para consultar registros
const Visita = require('./models/Visita');

// Ruta raíz para confirmar funcionamiento
app.get('/', (req, res) => {
  res.send('✅ API de Farmacia funcionando correctamente');
});

// Ruta para obtener las visitas (ya no es necesaria si ya tienes en visitaRoutes)
app.get('/api/visitas', async (req, res) => {
  try {
    const visitas = await Visita.find().sort({ fecha: -1 });
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo visitas' });
  }
});

console.log("authRoutes, empleadoRoutes y productoRoutes cargados correctamente");

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
