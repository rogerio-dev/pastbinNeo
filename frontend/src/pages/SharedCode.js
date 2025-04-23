import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SharedCode = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [code, setCode] = useState(""); // Estado para armazenar o código
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const URL_BACKEND = 'https://pastbin-neo-backend.vercel.app/api'; // URL do backend

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`${URL_BACKEND}/code/${id}`);
        if (!response.ok) {
          throw new Error("Código não encontrado"); // Lança erro se o código não for encontrado
        }
        const data = await response.json();
        setCode(data.code); // Armazena o código no estado
      } catch (error) {
        setError(error.message); // Armazena o erro no estado
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchCode();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>; // Exibe mensagem de carregamento
  }

  if (error) {
    return <p style={{ color: "red" }}>Erro: {error}</p>; // Exibe mensagem de erro
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Código Compartilhado</h1>
      <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
        {code}
      </pre>
    </div>
  );
};

export default SharedCode;