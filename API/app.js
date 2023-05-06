require("dotenv").config();
const Server = require("./Source/server");

const server = new Server();
server.listen();