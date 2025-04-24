const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productoRoutes = require('./routes/productoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express(); // ✅ Aquí debe estar antes de usar app.use

// Middleware para parsear el cuerpo de las solicitudes a formato JSON
app.use(express.json());

// Conexión con la base de datos MongoDB
mongoose.connect('mongodb://localhost/farmacia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log('Error de conexión', err));

// Usar las rutas
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes); // ✅ Aquí ya puedes usar app

// Puerto donde escuchará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

