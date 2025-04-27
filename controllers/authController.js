const Empleado = require('../models/Empleado');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const register = async (req, res) => {
  const { nombre, usuario, password, rol } = req.body;

  try {
    const existeEmpleado = await Empleado.findOne({ usuario });
    if (existeEmpleado) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoEmpleado = new Empleado({
      nombre,
      usuario,
      password: hashedPassword,
      rol
    });

    await nuevoEmpleado.save();
    res.status(201).json({ mensaje: 'Empleado registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
  }
};

const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const empleado = await Empleado.findOne({ usuario });
    if (!empleado) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, empleado.password);
    if (!match) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: empleado._id, usuario: empleado.usuario, rol: empleado.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

module.exports = { register, login };
