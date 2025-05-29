const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ mensaje: 'Email ya registrado' });

    // Crear nuevo usuario
    const user = new User({ nombre, email, password, rol });
    await user.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

    // Comparar contraseña
    const esValido = await user.compararPassword(password);
    if (!esValido) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

    // Crear token JWT con id y rol
    const token = jwt.sign(
      { id: user._id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en login', error: error.message });
  }
};

module.exports = { register, login };
