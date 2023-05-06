import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  // const [count, setCount] = useState(0);

  if (localStorage.getItem("isLogin")) {
    return (
      <>
        <div className="sidebar pe-4 pb-3">
          <nav className="navbar bg-secondary navbar-dark">
            <NavLink to="/" className="navbar-brand mx-4 mb-3">
              <h3 className="text-primary">
                <i className="fa fa-user-edit me-2"></i>
                Ctrl Store
              </h3>
            </NavLink>

            <div className="navbar-nav w-100">
              <NavLink to="/users" className="nav-item nav-link">
                <i className="fa fa-users me-2"></i>Usuarios
              </NavLink>
              <NavLink to="/roles" className="nav-item nav-link mt-1">
                <i className="fa fa-tachometer-alt me-2"></i>Roles
              </NavLink>
              <NavLink to="/customers" className="nav-item nav-link mt-1">
                <i className="fa fa-user-tag me-2"></i>Clientes
              </NavLink>
              <NavLink to="/products" className="nav-item nav-link mt-1">
                <i className="fa fa-boxes me-2"></i>Productos
              </NavLink>
              <NavLink to="providers" className="nav-item nav-link mt-1">
                <i className="fa fa-people-carry me-2"></i>Proveedores
              </NavLink>
            </div>
          </nav>
        </div>
        <div className="content">
          <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <div className="navbar-nav align-items-center ms-auto">
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <span className="d-none d-lg-inline-flex">
                    {localStorage.getItem("user")}
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <NavLink
                    to="/"
                    className="dropdown-item p-3 "
                    onClick={async () => {
                      await localStorage.removeItem("user");
                      await localStorage.removeItem("isLogin");
                      await localStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    <i class="fa fa-sign-out-alt me-2"></i>
                    Cerrar Sesión
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>

          <div className="principalContent container-fluid pt-2 px-4">
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return <Outlet />;
  }
}

export default Layout;
