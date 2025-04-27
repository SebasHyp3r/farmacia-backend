const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // <-- importamos mongoose
require('dotenv').config();

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado correctamente'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

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
