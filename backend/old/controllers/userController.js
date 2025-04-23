const db = require("../../src/models/db");

// Listar usuários
exports.getUsers = async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM users");
      res.json(rows);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error); // Log do erro no console
      res.status(500).json({ error: "Erro ao buscar usuários", details: error.message });
    }
  };

// Criar um novo usuário
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};