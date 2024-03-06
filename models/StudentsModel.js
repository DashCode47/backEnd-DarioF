const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  apellido: String,
  calle_2: String,
  ciudad: String,
  codigo_postal: String,
  contraseña: String,
  correo: String,
  direccion: String,
  id_usuario: String,
  nombre: String,
  provincia: String,
  rol: String,
  materia: String,
});

module.exports = mongoose.model("Students", studentsSchema);
