const db = require("../models/db");

// Salvar código no banco  
exports.saveCode = async (req, res) => {
  const { code } = req.body;
  try {
    const [result] = await db.query("INSERT INTO shared_codes (code) VALUES (?)", [code]);
    const id = result.insertId;
    const link = `${process.env.FRONTEND_URL}/code/${id}`; // Gera o link para o frontend
    res.json({ link });
  } catch (error) {
    console.error("Erro ao salvar código:", error);
    res.status(500).json({ error: "Erro ao salvar código" });
  }
};

// Recuperar código pelo ID
exports.getCode = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query("SELECT code FROM shared_codes WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Código não encontrado" });
      }
      res.json({ code: rows[0].code });
    } catch (error) {
      console.error("Erro ao buscar código:", error);
      res.status(500).json({ error: "Erro ao buscar código" });
    }
  };