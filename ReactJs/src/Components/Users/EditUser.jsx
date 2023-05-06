import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = "http://localhost:8086/users/";

const EditUser = () => {
  const [roles, setRoles] = useState([]);
  const [document, setDocument] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams();
  const redirect = useNavigate();

  const getRoles = async () => {
    const response = await axios.get("http://localhost:8086/roles/", {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setRoles(response.data.rolesList);
  };

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await axios.get(API + id, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const user = userResponse.data.user[0];
      setDocument(user.document);
      setUserName(user.userName);
      setEmail(user.email);
      setRole(user.role);
    };
    getUser();
  }, []);

  useEffect(() => {
    getRoles();
  });

  const updateUser = async () => {
    try {
      const response = await axios.put(
        API + id,
        {
          document: parseInt(document),
          userName: userName,
          email: email,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.type);
      redirect("/users");
    } catch (error) {
      console.log(error);
      alert(error.response.data.errors.map((err) => err.msg + "\n"));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="bg-secondary rounded h-100 p-4">
        <h4 className="mb-4">Editar Usuario</h4>
        <form className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingUserName"
                placeholder="."
                required={true}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="floatingUserName">Nombre de Usuario</label>
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
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="."
                min="0"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingEmail">Correo</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="floatingRole"
                aria-label="Floating label select example"
                required={true}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => {
                  return (
                    <option defaultValue={role.name} key={role._id}>
                      {role.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingRole">Rol</label>
            </div>
          </div>
        </form>
        <div className="row-cols-4">
          <button className="btn btn-dark mt-3" onClick={() => updateUser()}>
            Guardar
          </button>
          <Link to="/users" className="btn btn-primary mx-2 mt-3">Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
