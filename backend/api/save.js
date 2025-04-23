import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  // Configuração de CORS
  res.setHeader("Access-Control-Allow-Origin", "https://pastbin-neo.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Lidar com requisições preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { code } = req.body;

    try {
      const [result] = await db.query("INSERT INTO shared_codes (code) VALUES (?)", [code]);
      const id = result.insertId;
      const link = `${process.env.FRONTEND_URL}/code/${id}`;
      res.status(200).json({ link });
    } catch (error) {
      console.error("Erro ao salvar código:", error);
      res.status(500).json({ error: "Erro ao salvar código" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}