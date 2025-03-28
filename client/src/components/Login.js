import React, { useState } from "react";
import logo from "../assets/images/logoLoja.png";
import "./../styles/Login.css";
import axios from "axios"; 
import { Link } from "react-router-dom";


function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:3001/login", {
            usuario: email,
            senha: password,
        });

        if (response.data.success) {
            onLoginSuccess();
        } else {
            setError(response.data.message || "Erro no login!");
        }
    } catch (err) {
        setError("Erro ao conectar ao servidor!");
    }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo da Loja" className="logo" />
        <h1>Bem-vindo ao simulador de vendas</h1>

        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        <br></br>

        <div className="login-actions">

          <Link to="/lista-usuarios">Lista de Cadastros</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
