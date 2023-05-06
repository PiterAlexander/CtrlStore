const bcryptjs = require("bcryptjs");
const User = require("../models/usersModel");
const { newJWT } = require("../helpers/jwtGenerator");

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //Validación del Correo
    if (!user) {
      res.status(400).json({
        ok: 400,
        type: "Correo No encontrado.",
      });
    } else {
      // Comparación y validación de Contraseñas
      const comparePasswords = bcryptjs.compareSync(password, user.password);
      if (!comparePasswords) {
        res.status(400).json({
          ok: 400,
          type: "Contraseña NO válida",
        });
      } else {
        // Validación del Estado del usuario
        if (!user.status) {
          res.status(400).json({
            ok: 400,
            type: "Usuario Inactivo.",
          });
        } else {
          //Generacion del token
          const token = await newJWT(
            user._id,
            user.document,
            user.userName,
            user.email,
            user.role
          );

          res.json({
            ok: "200",
            user,
            token,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: 500,
      type: "Error de servidor",
    });
  }
};

module.exports = { postLogin };
