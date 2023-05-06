const { Schema, model } = require("mongoose");

const productModel = new Schema({
  name: {
    type: String,
    required: ["El Nombre es obligatorio."],
  },

  stock: {
    type: Number,
    required: ["La Cantidad de Stock es obligatoria."],
  },

  provider: {
    type: String,
    required: ["El nombre del proveedor es obligatorio."],
  },
});

module.exports = model("products", productModel);
