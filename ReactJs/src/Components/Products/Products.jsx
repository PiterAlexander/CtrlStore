import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8086/products/";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  });

  const getProducts = async () => {
    const allProducts = await axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setProducts(allProducts.data.productsList);
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(API + id, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    getProducts();
    return alert(response.data.type);
  };

  return (
    <>
      <div className="row mt-3 d-flex justify-content-end">
        <div className="col-4 text-end">
          <Link to="/createProduct" className="btn btn-secondary">
            <i className="fa fa-plus mx-2"> </i>Añadir Producto
          </Link>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col" className="col-4 ">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => {
                  return (
                    <tr key={product._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>{product.provider}</td>
                      <td className=" justify-content-center">
                        <Link
                          to={`/editProduct/${product._id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit mx-2"></i>Editar
                        </Link>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="btn btn-primary m-2"
                        >
                          <i className="fa fa-trash mx-2"></i>Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
