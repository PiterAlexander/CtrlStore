const { Schema, model } = require("mongoose");

const providerModel = new Schema({
  document: {
    type: Number,
    required: ["El Documento es obligatorio."],
    unique: true,
  },

  name: {
    type: String,
    required: ["El Nombre es obligatorio."],
  },

  lastName: {
    type: String,
    required: ["El Apellido es obligatorio."],
  },

  phoneNumber: {
    type: Number,
    required: ["El Teléfono es obligatorio."],
  },

  company: {
    type: String,
    required: ["La Empresa es obligatoria."],
  },
});

module.exports = model("providers", providerModel);
