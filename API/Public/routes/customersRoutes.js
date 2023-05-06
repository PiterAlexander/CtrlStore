const { Router } = require("express");
const { check } = require("express-validator");
const {
  validatorPath,
  validationDocumentCustomer,
  tokenValidation,
} = require("../middlewares/validator");

const {
  getCustomers,
  getCustomerById,
  getCustomersByCity,
  postCustomer,
  putCustomer,
  deleteCustomer,
} = require("../controllers/customersController");

const router = Router();

router.get(
  "/",
  [tokenValidation, validatorPath],
  getCustomers
);
router.get(
  "/:id",
  [
    tokenValidation,
    check("id", "Id NO válido.").isMongoId(),
    validatorPath,
  ],
  getCustomerById
);
router.get(
  "/city/:city",
  [tokenValidation, validatorPath],
  getCustomersByCity
);
router.post(
  "/",
  [
    tokenValidation,
    check("document", "El Documento es Obligatorio.").not().isEmpty(),
    check("document", "El Documento solo puede contener números.").isInt(),
    check("document").custom(validationDocumentCustomer),
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    check("lastName", "El Apellido es Obligatorio.").not().isEmpty(),
    check("phoneNumber", "El Teléfono es Obligatorio.").not().isEmpty(),
    check("phoneNumber", "El Teléfono solo puede contener números.").isInt(),
    check("city", "La Ciudad es Obligatoria.").not().isEmpty(),
    validatorPath,
  ],
  postCustomer
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
    check("city", "La Ciudad es Obligatoria.").not().isEmpty(),
    validatorPath,
  ],
  putCustomer
);
router.delete(
  "/:id",
  [
    tokenValidation,
    check("id", "Id NO válido.").isMongoId(),
    validatorPath,
  ],
  deleteCustomer
);

module.exports = router;
