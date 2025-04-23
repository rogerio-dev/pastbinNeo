import React, { useState } from "react";

const Home = () => {
  const [code, setCode] = useState(""); // Estado para armazenar o código digitado pelo usuário
  const [shareLink, setShareLink] = useState(""); // Estado para armazenar o link gerado
  const URL_BACKEND = 'https://pastbin-neo-backend.vercel.app/api'; // URL do backend
  // Função para enviar o código ao backend e gerar o link
  const handleGenerateLink = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }), // Envia o código no corpo da requisição
      });
      const data = await response.json();
      setShareLink(data.link); // Armazena o link gerado no estado
    } catch (error) {
      console.error("Erro ao gerar link:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Compartilhar Código</h1>
      <textarea
        placeholder="Cole seu código aqui..."
        value={code}
        onChange={(e) => setCode(e.target.value)} // Atualiza o estado com o código digitado
        style={{ width: "100%", height: "150px", marginBottom: "10px" }}
      />
      <button onClick={handleGenerateLink}>Gerar Link</button>
      {shareLink && (
        <div>
          <p>Link gerado:</p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;