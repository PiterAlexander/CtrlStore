import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8086/roles/";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    getRoles();
  });

  const getRoles = async () => {
    const allRoles = await axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setRoles(allRoles.data.rolesList);
  };

  const deleteRole = async (id) => {
    const response = await axios.delete(API + id, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    getRoles();
    return alert(response.data.type);
  };

  return (
    <>
      <div className="row mt-3 d-flex justify-content-end">
        <div className="col-4 text-end">
          <Link to="/createRole" className="btn btn-secondary">
            <i className="fa fa-plus mx-2"> </i>Añadir Rol
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
                  <th scope="col">Estado</th>
                  <th scope="col" className="col-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, i) => {
                  return (
                    <tr key={role._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{role.name}</td>
                      <td>{role.status ? "Activo" : "Inactivo"}</td>
                      <td className=" justify-content-center">
                        <Link
                          to={`/editRole/${role._id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit mx-2"></i>Editar
                        </Link>
                        <button
                          onClick={() => deleteRole(role._id)}
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

export default Roles;
