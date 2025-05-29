const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'empleado', 'usuario'], default: 'usuario' }
});

// Encriptar password antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar password
userSchema.methods.comparePassword = function (passwordEntrada) {
  return bcrypt.compare(passwordEntrada, this.password);
};

module.exports = mongoose.model('User', userSchema);
