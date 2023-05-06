const Product = require("../models/productsModel");

const getProducts = async (req, res) => {
  const productsList = await Product.find();
  res.send({
    ok: 200,
    productsList,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.find({ _id: id });

  res.send({
    ok: 200,
    product,
  });
};

const getProductsByProvider = async (req, res) => {
  const { provider } = req.params;
  const products = await Product.find({ provider: provider });

  res.send({
    ok: 200,
    products,
  });
};

const postProduct = async (req, res) => {
  const { name, stock, provider } = req.body;
  const product = new Product({
    name,
    stock,
    provider,
  });

  await product.save();
  res.send({
    ok: 200,
    type: "Registro Correcto",
  });
};

const putProduct = async (req, res) => {
  const params = req.params.id;
  const { name, stock, provider } = req.body;

  await Product.findByIdAndUpdate(params, {
    name,
    stock,
    provider,
  });

  res.send({
    ok: 200,
    type: "Registro Actualizado Correctamente",
  });
};

const deleteProduct = async (req, res) => {
  const params = req.params.id;

  await Product.findByIdAndDelete(params);

  res.send({
    ok: 200,
    type: "Registro Eliminado Correctamente",
  });
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByProvider,
  postProduct,
  putProduct,
  deleteProduct,
};
