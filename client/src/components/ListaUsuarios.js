import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/ListaUsuarios.css"

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [editarUsuario, setEditarUsuario] = useState(null);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = () => {
        axios.get("http://localhost:3001/usuarios")
            .then((response) => setUsuarios(response.data))
            .catch(() => alert("Erro ao carregar usuários!"));
    };

    const handleAtualizar = (id, usuario, senha) => {
        axios.put(`http://localhost:3001/usuarios/${id}`, { usuario, senha })
            .then(() => {
                alert("Usuário atualizado com sucesso!");
                carregarUsuarios();
                setEditarUsuario(null);
            })
            .catch(() => alert("Erro ao atualizar usuário!"));
    };

    const handleExcluir = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            axios.delete(`http://localhost:3001/usuarios/${id}`)
                .then(() => {
                    alert("Usuário excluído com sucesso!");
                    carregarUsuarios();
                })
                .catch(() => alert("Erro ao excluir usuário!"));
        }
    };

    return (
        <div class="listaUsuarios">
            <h2>Lista de Usuários</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>
                                {editarUsuario === usuario.id ? (
                                    <input 
                                        type="text" 
                                        defaultValue={usuario.usuario}
                                        onBlur={(e) => handleAtualizar(usuario.id, e.target.value, "novaSenha")}
                                    />
                                ) : (
                                    usuario.usuario
                                )}
                            </td>
                            <td>
                                <button onClick={() => setEditarUsuario(usuario.id)}>Editar</button>
                                <button onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaUsuarios;
