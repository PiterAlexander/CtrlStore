const express = require("express");
const cors = require("cors");
const { DBConnection } = require("../Public/config/connection");

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.connection();
  }

  middlewares() {
    this.app.use(express.static("Public"));
    this.app.use(express.json());
    this.app.use(cors());
  }

  connection() {
    DBConnection();
  }

  routes() {
    this.app.use("/users/", require("../Public/routes/usersRoutes.js"));
    this.app.use("/roles/", require("../Public/routes/rolesRoutes.js"));
    this.app.use("/customers/", require("../Public/routes/customersRoutes.js"));
    this.app.use("/providers/", require("../Public/routes/providersRoutes.js"));
    this.app.use("/products/", require("../Public/routes/productsRoutes.js"));
    this.app.use("/login/", require("../Public/routes/loginRoutes.js"));
  }

  listen() {
    this.app.listen(process.env.PORT);
    console.log("http://localhost:" + process.env.PORT);
  }
}

module.exports = Server;
