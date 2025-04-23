const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", routes);

module.exports = app;