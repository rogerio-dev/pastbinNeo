const db = require("../models/db");

module.exports = async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "https://pastbin-neo.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");


  if (req.method === "GET") {
    const { id } = req.query; // Use `req.query` em vez de `req.params` na Vercel
    try {
      const [rows] = await db.query("SELECT code FROM hml_pastbinneo.shared_codes WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Código não encontrado" });
      }
      res.json({ code: rows[0].code });
    } catch (error) {
      console.error("Erro ao buscar código:", error);
      res.status(500).json({ error: "Erro ao buscar código" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};