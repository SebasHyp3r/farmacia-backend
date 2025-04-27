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

// Importar rutas
const authRoutes = require('./routes/authRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);

console.log("authRoutes cargado correctamente");

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta de prueba general (opcional)
app.get('/test', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Escuchar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
