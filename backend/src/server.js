const app = require("./app");
const PORT = process.env.PORT || 5000;

require("dotenv").config();
console.log("Carregando variáveis de ambiente...");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});