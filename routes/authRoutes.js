const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registro
const register = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ mensaje: 'El usuario ya existe' });

    const nuevoUsuario = new User({ nombre, email, contraseña, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar', error });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const esValida = await usuario.compararContraseña(contraseña);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

module.exports = { register, login };
