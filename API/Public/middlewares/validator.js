const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const Role = require("../models/rolesModel");
const Customer = require("../models/customersModel");
const Provider = require("../models/providersModel");

// Validacion para saber si no hay errores en
// los datos enviados por el cliente
const validatorPath = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

// Inicio de validaciones para el módulo de Usuarios.

const validationDocumentUser = async (document = "") => {
  const documentNotIsEmpty = await User.findOne({ document });
  if (documentNotIsEmpty) {
    throw new Error("El Documento ya está registrado");
  }
};

const validationUserName = async (userName = "") => {
  const userNameNotIsEmpty = await User.findOne({ userName });
  if (userNameNotIsEmpty) {
    throw new Error("El Nombre de Usuario ya está registrado");
  }
};

const validationEmailUser = async (email = "") => {
  const emailNotIsEmpty = await User.findOne({ email });
  if (emailNotIsEmpty) {
    throw new Error("El Correo ya está registrado");
  }
};

const userRoleExist = async (role = "") => {
  const roleExisting = await Role.findOne({ name: role });
  if (!roleExisting) {
    throw new Error("El Rol NO está registrado");
  }
};

// Fin validaciones para el módulo de Usuarios

// Inicio validaciones para el módulo de Roles

const validationRoleName = async (name = "") => {
  const roleExisting = await Role.findOne({ name });
  if (roleExisting) {
    throw new Error("El Rol YA está registrado");
  }
};

// Fin validaciones para el módulo de Roles

// Inicio validaciones para el módulo de Clientes

const validationDocumentCustomer = async (document = "") => {
  const documentNotIsEmpty = await Customer.findOne({ document });
  if (documentNotIsEmpty) {
    throw new Error("El Documento ya está registrado");
  }
};

// Fin validaciones para el módulo de Clientes

// Inicio validaciones para el módulo de Proveedores

const validationDocumentProvider = async (document = "") => {
  const documentNotIsEmpty = await Provider.findOne({ document });
  if (documentNotIsEmpty) {
    throw new Error("El Documento ya está registrado");
  }
};

// Fin validaciones para el módulo de Proveedores

// Inicio validaciones para el módulo de Productos

const providerExist = async (provider = "") => {
  const providerExisting = await Provider.findOne({ name: provider });
  if (!providerExisting) {
    throw new Error("El Proveedor NO está registrado");
  }
};

// Fin validaciones para el módulo de Productos

// Inicio validaciones para el Token

const tokenValidation = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(400).json({
      ok: 400,
      type: "Por favor inicie sesión.",
    });
  } else {
    try {
      jwt.verify(token, process.env.PASSWORDTOKEN);
    } catch (error) {
      return res.status(400).json({
        ok: 400,
        type: "Token NO válido",
        error,
      });
    }
  }
  next();
};

// Fin validaciones para el Token

module.exports = {
  validatorPath,
  validationDocumentUser,
  validationUserName,
  validationEmailUser,
  userRoleExist,
  validationRoleName,
  validationDocumentCustomer,
  validationDocumentProvider,
  providerExist,
  tokenValidation,
};
