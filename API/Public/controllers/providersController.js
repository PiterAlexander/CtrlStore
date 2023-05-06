const Provider = require("../models/providersModel");

const getProviders = async (req, res) => {
const providersList = await Provider.find();
  res.send({
    ok: 200,
    providersList,
  });
};

const getProviderById = async (req, res) => {
  const { id } = req.params;
  const provider = await Provider.find({ _id: id });

  res.send({
    ok: 200,
    provider,
  });
};

const getProvidersByCompany = async (req, res) => {
  const { company } = req.params;
  const providers = await Provider.find({ company: company });

  res.send({
    ok: 200,
    providers,
  });
};

const postProvider = async (req, res) => {
  const { document, name, lastName, phoneNumber, company } = req.body;
  const provider = new Provider({
    document,
    name,
    lastName,
    phoneNumber,
    company,
  });

  await provider.save();
  res.send({
    ok: 200,
    type: "Registro Correcto",
  });
};

const putProvider = async (req, res) => {
  const params = req.params.id;
  const { document, name, lastName, phoneNumber, company } = req.body;

  await Provider.findByIdAndUpdate(params, {
    document,
    name,
    lastName,
    phoneNumber,
    company,
  });

  res.send({
    ok: 200,
    type: "Registro Actualizado Correctamente",
  });
};

const deleteProvider = async (req, res) => {
  const params = req.params.id;

  await Provider.findByIdAndDelete(params);

  res.send({
    ok: 200,
    type: "Registro Eliminado Correctamente",
  });
};

module.exports = {
  getProviders,
  getProviderById,
  getProvidersByCompany,
  postProvider,
  putProvider,
  deleteProvider,
};
