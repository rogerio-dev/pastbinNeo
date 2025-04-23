import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const [rows] = await db.query("SELECT code FROM shared_codes WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Código não encontrado" });
      }
      res.status(200).json({ code: rows[0].code });
    } catch (error) {
      console.error("Erro ao buscar código:", error);
      res.status(500).json({ error: "Erro ao buscar código" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}