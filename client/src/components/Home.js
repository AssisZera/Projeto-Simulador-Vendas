import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";
import logo from "../assets/images/logoLoja.png";
import Simulador from "../components/Simulador";

function Home({ onLogout }) {
  const navigate = useNavigate();

  return (
      <div>
          <header className="header">
              <img src={logo} alt="Logo da Loja" className="logo" />
              <div className="header-buttons">
                  <button className="btn-gerenciar" onClick={() => navigate("/gerenciar-taxas")}>
                      Gerenciar Taxas
                  </button>
                  <button className="btn-cadastrar" onClick={() => navigate("/cadastrar-usuario")}>
                      Cadastrar Usuários
                  </button>
                  <button className="btn-logout" onClick={onLogout}>
                      Sair
                  </button>
              </div>
          </header>
          <main className="main-content">
              <div className="simulador-section">
                  <Simulador />
              </div>
          </main>
      </div>
  );
}

export default Home;