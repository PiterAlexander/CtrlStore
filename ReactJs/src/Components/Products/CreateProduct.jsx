import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:8086/products/";

const CreateProduct = () => {
  const [providers, setProviders] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [provider, setProvider] = useState("");
  const redirect = useNavigate();

  const getProviders = async () => {
    const response = await axios.get("http://localhost:8086/providers/", {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setProviders(response.data.providersList);
  };

  useEffect(() => {
    getProviders();
  });

  const saveProduct = async () => {
    try {
      const response = await axios.post(
        API,
        {
          name: name,
          stock: parseInt(stock),
          provider: provider,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.type);
      redirect("/products");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.errors.map((err) => err.msg + "\n"));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="bg-secondary rounded h-100 p-4">
        <h4 className="mb-4">Crear Producto</h4>
        <form className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="."
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingName">Nombre</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingStock"
                placeholder="."
                required={true}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <label htmlFor="floatingStock">Stock</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="floatingRole"
                aria-label="Floating label select example"
                required={true}
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                <option>Seleccione un proveedor...</option>
                {providers.map((provider) => {
                  return (
                    <option defaultValue={provider.name} key={provider._id}>
                      {provider.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingRole">Proveedor</label>
            </div>
          </div>
        </form>
        <div className="row-cols-4">
          <button className="btn btn-dark mt-3" onClick={() => saveProduct()}>
            Guardar
          </button>
          <Link to="/products" className="btn btn-primary mx-2 mt-3">Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
