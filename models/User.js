const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' }
});

// Hook para encriptar contraseña
userSchema.pre('save', async function (next) {
  console.log('Password recibido en pre-save:', this.password);
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseña
userSchema.methods.comparePassword = function (entrada) {
  return bcrypt.compare(entrada, this.password);
};

module.exports = mongoose.model('User', userSchema);
