import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8086/users/";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  });

  const getUsers = async () => {
    const allUsers = await axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    setUsers(allUsers.data.usersList);
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(API + id, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    getUsers();
    return alert(response.data.type);
  };

  return (
    <>
      <div className="row mt-3 d-flex justify-content-end">
        <div className="col-4 text-end">
          <Link to="/createUser" className="btn btn-secondary">
            <i className="fa fa-plus mx-2"> </i>Añadir Usuario
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
                  <th scope="col">Nombre de Usuario</th>
                  <th scope="col">Documento</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Rol</th>
                  <th scope="col" className="col-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr key={user._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{user.userName}</td>
                      <td>{user.document}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className=" justify-content-center">
                        <Link
                          to={`/editUser/${user._id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit mx-2"></i>Editar
                        </Link>
                        <button
                          onClick={() => deleteUser(user._id)}
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

export default Users;
