const Role = require("../models/rolesModel");

const getRoles = async (req, res) => {
  const rolesList = await Role.find();
  res.send({
    ok: 200,
    rolesList,
  });
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  const role = await Role.find({ _id: id });

  res.send({
    ok: 200,
    role,
  });
};

const postRole = async (req, res) => {
  const { name } = req.body;
  const role = new Role({ name });

  await role.save();

  res.send({
    ok: 200,
    type: "Registro Correcto",
  });
};

const putRole = async (req, res) => {
  const params = req.params.id;
  const { name } = req.body;

  await Role.findByIdAndUpdate(params, { name });

  res.send({
    ok: 200,
    type: "Registro Actualizado Correctamente",
  });
};

const deleteRole = async (req, res) => {
  const params = req.params.id;

  await Role.findByIdAndDelete(params);

  res.send({
    ok: 200,
    type: "Registro Eliminado Correctamente",
  });
};

module.exports = { getRoles, getRoleById, postRole, putRole, deleteRole };
