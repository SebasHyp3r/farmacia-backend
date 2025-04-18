const express = require('express');
const mongoose = require('mongoose');
const productoRoutes = require('./routes/productoRoutes'); // Importamos las rutas para productos

const app = express();

// Middleware para parsear el cuerpo de las solicitudes a formato JSON
app.use(express.json());

// Conexión con la base de datos MongoDB
mongoose.connect('mongodb://localhost/farmacia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log('Error de conexión', err));

// Usar las rutas de productos
app.use('/api/productos', productoRoutes);

// Puerto donde escuchará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
