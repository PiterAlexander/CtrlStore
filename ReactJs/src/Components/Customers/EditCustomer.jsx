import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = "http://localhost:8086/customers/";

const EditCustomer = () => {
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    const getCustomer = async () => {
      const customerResponse = await axios.get(API + id, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const customer = customerResponse.data.customer[0];
      setDocument(customer.document);
      setName(customer.name);
      setLastName(customer.lastName);
      setPhoneNumber(customer.phoneNumber);
      setCity(customer.city);
    };
    getCustomer();
  }, []);

  const updateCustomer = async () => {
    try {
      const response = await axios.put(
        API + id,
        {
          document: parseInt(document),
          name: name,
          lastName: lastName,
          phoneNumber: parseInt(phoneNumber),
          city: city,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.type);
      redirect("/customers");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.errors.map((err) => err.msg + "\n"));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="bg-secondary rounded h-100 p-4">
        <h4 className="mb-4">Editar Cliente</h4>
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
                id="floatingdocument"
                placeholder="."
                required={true}
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
              <label htmlFor="floatingdocument">Documento</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="."
                min="0"
                required={true}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="floatingEmail">Ciudad</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingLastName"
                placeholder="."
                required={true}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="floatingLastName">Apellido</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingPhoneNumber"
                placeholder="."
                required={true}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label htmlFor="floatingPhoneNumber">Teléfono</label>
            </div>
          </div>
        </form>
        <div className="row-cols-4">
          <button
            className="btn btn-dark mt-3"
            onClick={() => updateCustomer()}
          >
            Guardar
          </button>
          <Link to="/customers" className="btn btn-primary mx-2 mt-3">Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
