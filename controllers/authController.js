const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    console.log('Body recibido en /register:', req.body);

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son obligatorios' });
    }

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const nuevoUsuario = new User({ nombre, email, password, rol });
    await nuevoUsuario.save();

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

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValido = await usuario.comparePassword(password);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Aquí puedes crear y enviar un JWT u otro sistema de autenticación
    res.json({ mensaje: 'Login exitoso', usuario: { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en login', error: error.message });
  }
};

module.exports = { register, login };
