import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8086/providers/";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    getProviders();
  });

  const getProviders = async () => {
    const allProviders = await axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setProviders(allProviders.data.providersList);
  };

  const deleteProvider = async (id) => {
    const response = await axios.delete(API + id, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    getProviders();
    return alert(response.data.type);
  };

  return (
    <>
      <div className="row mt-3 d-flex justify-content-end">
        <div className="col-4 text-end">
          <Link to="/createProvider" className="btn btn-secondary">
            <i className="fa fa-plus mx-2"> </i>Añadir Proveedor
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
                  <th scope="col">Apellido</th>
                  <th scope="col">Documento</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Empresa</th>
                  <th scope="col" className="col-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider, i) => {
                  return (
                    <tr key={provider._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{provider.name}</td>
                      <td>{provider.lastName}</td>
                      <td>{provider.document}</td>
                      <td>{provider.phoneNumber}</td>
                      <td>{provider.company}</td>
                      <td className=" justify-content-center">
                        <Link
                          to={`/editProvider/${provider._id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit mx-2"></i>Editar
                        </Link>
                        <button
                          onClick={() => deleteProvider(provider._id)}
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

export default Providers;
