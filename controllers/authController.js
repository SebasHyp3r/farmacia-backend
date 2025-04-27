const Empleado = require('../models/Empleado');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Registrar empleado
const register = async (req, res) => {
  const { nombre, usuario, password, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existeEmpleado = await Empleado.findOne({ usuario });
    if (existeEmpleado) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo empleado
    const nuevoEmpleado = new Empleado({
      nombre,
      usuario,
      password: hashedPassword,
      rol
    });

    await nuevoEmpleado.save();
    res.status(201).json({ mensaje: 'Empleado registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
  }
};

// Login empleado
const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Buscar el empleado
    const empleado = await Empleado.findOne({ usuario });
    if (!empleado) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const match = await bcrypt.compare(password, empleado.password);
    if (!match) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: empleado._id,
        usuario: empleado.usuario,
        rol: empleado.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      empleado: {
        id: empleado._id,
        nombre: empleado.nombre,
        usuario: empleado.usuario,
        rol: empleado.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = { register, login };
