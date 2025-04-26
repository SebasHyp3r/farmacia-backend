const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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

// Ruta de prueba general (opcional)
app.get('/test', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Escuchar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
