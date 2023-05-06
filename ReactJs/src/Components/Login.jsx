import React, { Component } from "react";
import axios from "axios";

const API = "http://localhost:8086/login";
export class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  SessionStart = async () => {
    const data = await axios
      .post(API, {
        email: this.state.form.email,
        password: this.state.form.password,
      })
      .then(async (response) => {
        console.log(response.data);
        await localStorage.setItem("user", response.data.user["userName"]);
        await localStorage.setItem("token", response.data.token);
        // console.log(localStorage.getItem("token"));
        localStorage.setItem("isLogin", "true");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.errors.map((err) => err.msg + "\n"));
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div className="justify-content-center d-flex align-items-center vh-100 w-100">
        <div className="col-4">
          <div className="bg-secondary rounded p-3 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <h3 className="text-primary">
                <i className="fa fa-user me-2"></i>Iniciar Sesión
              </h3>
            </div>
            <form>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control "
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  onChange={this.handleChange}
                  required={true}
                />
                <label htmlFor="floatingInput">Correo</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  required={true}
                />
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>

              {this.state.form.email != "" && this.state.form.password != "" ? (
                <input
                  type="button"
                  className="btn btn-primary py-3 w-100 mt-2 mb-2"
                  defaultValue="Ingresar"
                  onClick={() => {
                    this.SessionStart();
                  }}
                />
              ) : (
                <input
                  type="button"
                  className="btn btn-primary py-3 w-100 mt-2 mb-2"
                  defaultValue="Ingresar"
                  disabled
                />
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
