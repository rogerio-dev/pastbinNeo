import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    try {
      const [result] = await db.query("INSERT INTO shared_codes (code) VALUES (?)", [code]);
      const id = result.insertId;
      const link = `${FRONTEND_URL}/code/${id}`;
      res.status(200).json({ link });
    } catch (error) {
      console.error("Erro ao salvar código:", error);
      res.status(500).json({ error: "Erro ao salvar código" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}