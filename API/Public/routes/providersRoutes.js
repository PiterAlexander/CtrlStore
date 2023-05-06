const { Router } = require("express");
const { check } = require("express-validator");
const {
  validatorPath,
  validationDocumentProvider,
  tokenValidation,
} = require("../middlewares/validator");

const {
  getProviders,
  getProviderById,
  getProvidersByCompany,
  postProvider,
  putProvider,
  deleteProvider,
} = require("../controllers/providersController");

const router = Router();

router.get("/", [tokenValidation, validatorPath], getProviders);
router.get(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  getProviderById
);
router.get(
  "/company/:company",
  [tokenValidation, validatorPath],
  getProvidersByCompany
);
router.post(
  "/",
  [
    tokenValidation,
    check("document", "El Documento es Obligatorio.").not().isEmpty(),
    check("document", "El Documento solo puede contener números.").isInt(),
    check("document").custom(validationDocumentProvider),
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    check("lastName", "El Apellido es Obligatorio.").not().isEmpty(),
    check("phoneNumber", "El Teléfono es Obligatorio.").not().isEmpty(),
    check("phoneNumber", "El Teléfono solo puede contener números.").isInt(),
    check("company", "La Empresa es Obligatoria.").not().isEmpty(),
    validatorPath,
  ],
  postProvider
);
router.put(
  "/:id",
  [
    tokenValidation,
    check("id", "Id NO válido.").isMongoId(),
    check("document", "El Documento es Obligatorio.").not().isEmpty(),
    check("document", "El Documento solo puede contener números.").isInt(),
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    check("lastName", "El Apellido es Obligatorio.").not().isEmpty(),
    check("phoneNumber", "El Teléfono es Obligatorio.").not().isEmpty(),
    check("phoneNumber", "El Teléfono solo puede contener números.").isInt(),
    check("company", "La Empresa es Obligatoria.").not().isEmpty(),
    validatorPath,
  ],
  putProvider
);
router.delete(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  deleteProvider
);

module.exports = router;
