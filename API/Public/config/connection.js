const mongoose = require("mongoose");

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Conexión exitosa");
  } catch (error) {
    console.log("Error de conexión: " + error);
  }
};

module.exports = { DBConnection };
