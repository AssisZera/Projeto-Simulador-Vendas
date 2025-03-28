import React, { useState } from "react";
import axios from "axios";
import "./../styles/CadastrarUsuario.css"

function CadastrarUsuario() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const handleCadastro = () => {
        if (!usuario || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        axios.post("http://localhost:3001/usuarios", { usuario, senha })
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                setUsuario("");
                setSenha("");
            })
            .catch(() => alert("Erro ao cadastrar usuário!"));
    };

    return (
        <div class="cadastrarUsuario"> 
            <h2>Cadastrar Usuário</h2>
            <input 
                type="text" 
                placeholder="Usuário" 
                value={usuario} 
                onChange={(e) => setUsuario(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Senha" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
            />
            <button onClick={handleCadastro}>Cadastrar</button>
        </div>
    );
}

export default CadastrarUsuario;
