import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import GerenciarTaxas from "./components/GerenciarTaxas";
import CadastrarUsuario from "./components/CadastrarUsuario";
import ListaUsuarios from "./components/ListaUsuarios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
      <Router>
          <Routes>
              <Route 
                  path="/" 
                  element={isAuthenticated ? <Home onLogout={() => setIsAuthenticated(false)} /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />} 
              />
              <Route path="/gerenciar-taxas" element={<GerenciarTaxas />} />
              <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
              <Route path="/lista-usuarios" element={<ListaUsuarios />} />
          </Routes>
      </Router>
  );
}


export default App;
