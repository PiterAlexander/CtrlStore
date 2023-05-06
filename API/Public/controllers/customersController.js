const Customer = require("../models/customersModel");

const getCustomers = async (req, res) => {
  const customersList = await Customer.find();
  res.send({
    ok: 200,
    customersList,
  });
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.find({ _id: id });

  res.send({
    ok: 200,
    customer,
  });
};

const getCustomersByCity = async (req, res) => {
  const { city } = req.params;
  const customers = await Customer.find({ city: city });

  res.send({
    ok: 200,
    customers,
  });
};

const postCustomer = async (req, res) => {
  const { document, name, lastName, phoneNumber, city } = req.body;
  const customer = new Customer({
    document,
    name,
    lastName,
    phoneNumber,
    city,
  });

  await customer.save();
  res.send({
    ok: 200,
    type: "Registro Correcto",
  });
};

const putCustomer = async (req, res) => {
  const params = req.params.id;
  const { document, name, lastName, phoneNumber, city } = req.body;

  await Customer.findByIdAndUpdate(params, {
    document,
    name,
    lastName,
    phoneNumber,
    city,
  });

  res.send({
    ok: 200,
    type: "Registro Actualizado Correctamente",
  });
};

const deleteCustomer = async (req, res) => {
  const params = req.params.id;

  await Customer.findByIdAndDelete(params);

  res.send({
    ok: 200,
    type: "Registro Eliminado Correctamente",
  });
};

module.exports = {
  getCustomers,
  getCustomerById,
  getCustomersByCity,
  postCustomer,
  putCustomer,
  deleteCustomer,
};
