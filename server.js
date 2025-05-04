const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Modelo de Visita
const Visita = require('./models/Visita');

// Middleware para registrar cada visita
app.use(async (req, res, next) => {
  try {
    await Visita.create({
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
  } catch (error) {
    console.error('Error registrando visita:', error.message);
  }
  next();
});

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const productoRoutes = require('./routes/productoRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/productos', productoRoutes);

// Ruta de prueba para ver las visitas (opcional)
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

// Escuchar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
