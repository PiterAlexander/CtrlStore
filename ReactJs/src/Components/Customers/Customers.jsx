import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8086/customers/";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers();
  });

  const getCustomers = async () => {
    const allCustomers = await axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    setCustomers(allCustomers.data.customersList);
  };

  const deleteCustomer = async (id) => {
    const response = await axios.delete(API + id, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    getCustomers();
    return alert(response.data.type);
  };

  return (
    <>
      <div className="row mt-3 d-flex justify-content-end">
        <div className="col-4 text-end">
          <Link to="/createCustomer" className="btn btn-secondary">
            <i className="fa fa-plus mx-2"> </i>Añadir Cliente
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
                  <th scope="col">Ciudad</th>
                  <th scope="col" className="col-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, i) => {
                  return (
                    <tr key={customer._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{customer.name}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.document}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.city}</td>

                      <td className=" justify-content-center">
                        <Link
                          to={`/editCustomer/${customer._id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit mx-2"></i>Editar
                        </Link>
                        <button
                          onClick={() => deleteCustomer(customer._id)}
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

export default Customers;
