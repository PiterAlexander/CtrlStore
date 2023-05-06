import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const API = "http://localhost:8086/roles/";

const EditRole = () => {
  const [name, setName] = useState("");
  const { id } = useParams();

  const redirect = useNavigate();

  useEffect(() => {
    const getRole = async () => {
      const roleResponse = await axios.get(API + id, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const role = roleResponse.data.role[0];
      setName(role.name);
    };
    getRole();
  }, []);

  const updateRole = async () => {
    try {
      const response = await axios.put(
        API + id,
        {
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.type);
      redirect("/roles");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.errors.map((err) => err.msg + "\n"));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="bg-secondary rounded h-100 p-4">
        <h4 className="mb-4">Editar Rol</h4>
        <form className="row">
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingUserName"
                placeholder="."
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingUserName">Nombre</label>
            </div>
          </div>
        </form>
        <div className="row-cols-4">
          <button className="btn btn-dark mt-3" onClick={() => updateRole()}>
            Guardar
          </button>
          <Link to="/roles" className="btn btn-primary mx-2 mt-3">Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
