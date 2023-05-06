const { Router } = require("express");
const { check } = require("express-validator");
const {
  validatorPath,
  validationRoleName,
  tokenValidation,
} = require("../middlewares/validator");

const {
  getRoles,
  getRoleById,
  postRole,
  putRole,
  deleteRole,
} = require("../controllers/rolesController");

const router = Router();

router.get("/", [tokenValidation, validatorPath], getRoles);
router.get(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  getRoleById
);
router.post(
  "/",
  [
    tokenValidation,
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    check("name").custom(validationRoleName),
    validatorPath,
  ],
  postRole
);
router.put(
  "/:id",
  [
    tokenValidation,
    check("id", "Id NO válido.").isMongoId(),
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    validatorPath,
  ],
  putRole
);
router.delete(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  deleteRole
);

module.exports = router;
