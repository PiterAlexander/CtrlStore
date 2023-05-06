const { Router } = require("express");
const { check } = require("express-validator");
const {
  validatorPath,
  validationDocumentUser,
  validationUserName,
  validationEmailUser,
  userRoleExist,
  tokenValidation,
} = require("../middlewares/validator");

const {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usersController");

const router = Router();

router.get("/", getUsers);
router.get(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  getUserById
);
router.post(
  "/",
  [
    check("document", "El Documento es Obligatorio.").not().isEmpty(),
    check("document", "El Documento solo puede contener números.").isInt(),
    check("document").custom(validationDocumentUser),
    check("userName", "El Nombre de Usuario es Obligatorio.").not().isEmpty(),
    check("userName").custom(validationUserName),
    check("email", "El Correo es Obligatorio.").not().isEmpty(),
    check("email", "Correo no válido").isEmail(),
    check("email").custom(validationEmailUser),
    check("password", "La Contraseña es Obligatoria.").not().isEmpty(),
    check("password", "La Contraseña debe tener mínimo 8 caracteres").isLength({
      min: 8,
    }),
    check("role", "El Rol es Obligatorio.").not().isEmpty(),
    check("role").custom(userRoleExist),
    validatorPath,
  ],
  postUser
);
router.put(
  "/:id",
  [
    tokenValidation,
    check("id", "Id NO válido.").isMongoId(),
    check("document", "El Documento es Obligatorio.").not().isEmpty(),
    check("document", "El Documento solo puede contener números.").isInt(),
    check("userName", "El Nombre de Usuario es Obligatorio.").not().isEmpty(),
    check("email", "El Correo es Obligatorio.").not().isEmpty(),
    check("email", "Correo no válido").isEmail(),
    check("role", "El Rol es Obligatorio.").not().isEmpty(),
    check("role").custom(userRoleExist),
    validatorPath,
  ],
  putUser
);
router.delete(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  deleteUser
);

module.exports = router;
