const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/userController");
const { saveCode, getCode } = require("../controllers/codeController");

// Rota para listar usuários
router.get("/users", getUsers);

// Rota para criar um novo usuário
router.post("/users", createUser);

// Rota para salvar código  
router.post("/save", saveCode);  
  
// Rota para recuperar código  
router.get("/code/:id", getCode);

module.exports = router;