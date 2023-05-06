const { Schema, model } = require("mongoose");

const roleModel = new Schema({
  name: {
    type: String,
    required: ["El Nombre es obligatorio."],
    unique: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("roles", roleModel);
