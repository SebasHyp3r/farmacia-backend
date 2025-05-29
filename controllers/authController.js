const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Nombre, email y password son obligatorios' });
    }

    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const nuevoUser = new User({ nombre, email, password, rol });
    await nuevoUser.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValido = await user.comparePassword(password);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Password incorrecto' });
    }

    // Aquí podrías generar un token JWT y enviarlo
    res.json({ mensaje: 'Login exitoso', usuario: { nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en login', error: error.message });
  }
};

module.exports = { register, login };
