const db = require("../models/db");

const allowedOrigins = [
  'https://pastbin-neo.vercel.app',
  'https://pastbin-neo-backend.vercel.app',
  'http://localhost:3000'
];

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Trate requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { code } = req.body;
    try {
      const [result] = await db.query("INSERT INTO hml_pastbinneo.shared_codes (code) VALUES (?)", [code]);
      const id = result.insertId;
      const link = `${process.env.FRONTEND_URL}/code/${id}`;
      res.json({ link });
    } catch (error) {
      console.error("Erro ao salvar código:", error);
      res.status(500).json({ error: "Erro ao salvar código" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};