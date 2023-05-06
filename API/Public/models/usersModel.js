const { Schema, model } = require("mongoose");

const userModel = new Schema({
  document: {
    type: Number,
    required: ["El Documento es obligatorio."],
    unique: true,
  },

  userName: {
    type: String,
    required: ["El Nombre de usuario es obligatorio."],
    unique: true,
  },

  email: {
    type: String,
    required: ["El Correo es obligatorio."],
    unique: true,
  },

  password: {
    type: String,
    required: ["La Contraseña es obligatoria."],
  },

  role: {
    type: String,
    required: ["El Rol es obligatorio."],
  },

  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("users", userModel);
