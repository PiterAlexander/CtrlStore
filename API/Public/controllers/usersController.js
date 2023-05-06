const bcryptjs = require("bcryptjs");
const User = require("../models/usersModel");

const getUsers = async (req, res) => {
  const usersList = await User.find();
  res.send({
    ok: 200,
    usersList,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.find({ _id: id });

  res.send({
    ok: 200,
    user,
  });
};

const postUser = async (req, res) => {
  const { document, userName, email, password, role } = req.body;
  const user = new User({ document, userName, email, password, role });

  user.password = bcryptjs.hashSync(password, 10);

  await user.save();
  res.send({
    ok: 200,
    type: "Registro Correcto",
  });
};

const putUser = async (req, res) => {
  const params = req.params.id;
  var { document, userName, email, role, status } = req.body;

  await User.findByIdAndUpdate(params, {
    document,
    userName,
    email,
    role,
    status,
  });

  res.send({
    ok: 200,
    type: "Registro Actualizado Correctamente",
  });
};

const deleteUser = async (req, res) => {
  const params = req.params.id;

  await User.findByIdAndDelete(params);

  res.send({
    ok: 200,
    type: "Registro Eliminado Correctamente",
  });
};

module.exports = { getUsers, getUserById, postUser, putUser, deleteUser };
