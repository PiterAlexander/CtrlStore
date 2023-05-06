import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:8086/providers/";

const CreateProvider = () => {
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const redirect = useNavigate();

  const saveProvider = async () => {
    try {
      const response = await axios.post(
        API,
        {
          document: parseInt(document),
          name: name,
          lastName: lastName,
          phoneNumber: parseInt(phoneNumber),
          company: company,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.type);
      redirect("/providers");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.errors.map((err) => err.msg + "\n"));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="bg-secondary rounded h-100 p-4">
        <h4 className="mb-4">Crear Proveedor</h4>
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
                type="text"
                className="form-control"
                id="floatingCompany"
                placeholder="."
                min="0"
                required={true}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <label htmlFor="floatingCompany">Empresa</label>
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
          <button className="btn btn-dark mt-3" onClick={() => saveProvider()}>
            Guardar
          </button>
          <Link to="/providers" className="btn btn-primary mx-2 mt-3">Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProvider;
