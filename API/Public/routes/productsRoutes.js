const { Router } = require("express");
const { check } = require("express-validator");
const {
  validatorPath,
  providerExist,
  tokenValidation,
} = require("../middlewares/validator");

const {
  getProducts,
  getProductById,
  getProductsByProvider,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controllers/productsController");

const router = Router();

router.get("/", [tokenValidation, validatorPath], getProducts);

router.get(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  getProductById
);
router.get(
  "/provider/:provider",
  [tokenValidation, validatorPath],
  getProductsByProvider
);
router.post(
  "/",
  [
    tokenValidation,
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    check("stock", "La Cantidad es Obligatoria.").not().isEmpty(),
    check("stock", "La Cantidad solo puede contener números.").isInt(),
    check("provider", "El Proovedor es Obligatorio.").not().isEmpty(),
    check("provider").custom(providerExist),
    validatorPath,
  ],
  postProduct
);
router.put(
  "/:id",
  [
    tokenValidation,
    check("id", "Id NO válido.").isMongoId(),
    check("name", "El Nombre es Obligatorio.").not().isEmpty(),
    check("stock", "La Cantidad es Obligatoria.").not().isEmpty(),
    check("stock", "La Cantidad solo puede contener números.").isInt(),
    check("provider", "El Proovedor es Obligatorio.").not().isEmpty(),
    check("provider").custom(providerExist),
    validatorPath,
  ],
  putProduct
);
router.delete(
  "/:id",
  [tokenValidation, check("id", "Id NO válido.").isMongoId(), validatorPath],
  deleteProduct
);

module.exports = router;
