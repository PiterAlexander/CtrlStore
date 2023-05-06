import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout";
import { NotFound } from "../Components/NotFound";
import { Login } from "../Components/Login";

// importacion del modulo de usuarios
import Users from "../Components/Users/Users";
import CreateUser from "../Components/Users/CreateUser";
import EditUser from "../Components/Users/EditUser";

// importacion del modulo de roles
import Roles from "../Components/Roles/Roles";
import CreateRole from "../Components/Roles/CreateRole";
import EditRole from "../Components/Roles/EditRole";

//importacion del modulo de clientes
import Customers from "../Components/Customers/Customers";
import CreateCustomer from "../Components/Customers/CreateCustomer";
import EditCustomer from "../Components/Customers/EditCustomer";

// importacion del modulo de productos
import Products from "../Components/Products/Products";
import CreateProduct from "../Components/Products/CreateProduct";
import EditProduct from "../Components/Products/EditProduct";

// importacion del modulo de Proveedores
import Providers from "../Components/Providers/Providers";
import CreateProvider from "../Components/Providers/CreateProvider";
import EditProvider from "../Components/Providers/EditProvider";

var content = {};
if (localStorage.getItem("isLogin")) {
  content = (
    <div className="justify-content-center d-flex align-items-end mt-5 w-100">
      <h1 className="text-primary">Bienvenido a Ctrl Store</h1>
    </div>
  );
} else {
  content = <Login />;
}

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      { path: "/", element: content },
      //rutas modulo Usuarios
      {
        path: "/users",
        element: localStorage.getItem("isLogin") ? <Users /> : <Login />,
      },
      {
        path: "/createUser",
        element: localStorage.getItem("isLogin") ? <CreateUser /> : <Login />,
      },
      {
        path: "/editUser/:id",
        element: localStorage.getItem("isLogin") ? <EditUser /> : <Login />,
      },
      //rutas modulo Roles
      {
        path: "/roles",
        element: localStorage.getItem("isLogin") ? <Roles /> : <Login />,
      },
      {
        path: "/createRole",
        element: localStorage.getItem("isLogin") ? <CreateRole /> : <Login />,
      },
      {
        path: "/editRole/:id",
        element: localStorage.getItem("isLogin") ? <EditRole /> : <Login />,
      },
      //rutas modulo Clientes
      {
        path: "/customers",
        element: localStorage.getItem("isLogin") ? <Customers /> : <Login />,
      },
      {
        path: "/createCustomer",
        element: localStorage.getItem("isLogin") ? (
          <CreateCustomer />
        ) : (
          <Login />
        ),
      },
      {
        path: "/editCustomer/:id",
        element: localStorage.getItem("isLogin") ? <EditCustomer /> : <Login />,
      },
      //rutas modulo Productos
      {
        path: "/products",
        element: localStorage.getItem("isLogin") ? <Products /> : <Login />,
      },
      {
        path: "/createProduct",
        element: localStorage.getItem("isLogin") ? (
          <CreateProduct />
        ) : (
          <Login />
        ),
      },
      {
        path: "/editProduct/:id",
        element: localStorage.getItem("isLogin") ? <EditProduct /> : <Login />,
      },
      //rutas modulo Proveedores
      {
        path: "/providers",
        element: localStorage.getItem("isLogin") ? <Providers /> : <Login />,
      },
      {
        path: "/createProvider",
        element: localStorage.getItem("isLogin") ? (
          <CreateProvider />
        ) : (
          <Login />
        ),
      },
      {
        path: "editProvider/:id",
        element: localStorage.getItem("isLogin") ? <EditProvider /> : <Login />,
      },
    ],
  },
]);
