const { Router } = require("express");
const { check } = require("express-validator");
const { validatorPath } = require("../middlewares/validator");
const { postLogin } = require("../controllers/loginController");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email Requerido.").not().isEmpty(),
    check("email", "Email NO válido.").isEmail(),
    check("password", "La Contraseña es Requerida").not().isEmpty(),
    check("password", "La Contraseña debe tener mínimo 8 caracteres").isLength({
      min: 8,
    }),
    validatorPath,
  ],
  postLogin
);

module.exports = router;
