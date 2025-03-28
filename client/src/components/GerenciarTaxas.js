import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/GerenciarTaxas.css";

function GerenciarTaxas() {
    const [taxas, setTaxas] = useState([]);
    const [bandeiraSelecionada, setBandeiraSelecionada] = useState("");
    const [novaTaxa, setNovaTaxa] = useState({ debito: "", credito: "", parcelas: "" });
    const [novaTaxaCriacao, setNovaTaxaCriacao] = useState({ bandeira: "", debito: "", credito: "", parcelas: "" });

    useEffect(() => {
        carregarTaxas();
    }, []);

    const carregarTaxas = () => {
        axios.get("http://localhost:3001/taxas")
            .then((response) => setTaxas(response.data))
            .catch(() => alert("Erro ao carregar taxas!"));
    };

    const handleAtualizar = () => {
        if (!bandeiraSelecionada) {
            alert("Selecione uma bandeira para atualizar!");
            return;
        }

        axios.put("http://localhost:3001/taxas", { bandeira: bandeiraSelecionada, ...novaTaxa })
            .then(() => {
                alert("Taxa atualizada com sucesso!");
                carregarTaxas();
            })
            .catch(() => alert("Erro ao atualizar taxa!"));
    };

    const handleCriar = () => {
        const { bandeira, debito, credito, parcelas } = novaTaxaCriacao;
        if (!bandeira || !debito || !credito || !parcelas) {
            alert("Preencha todos os campos!");
            return;
        }

        axios.post("http://localhost:3001/taxas", { bandeira, debito, credito, parcelas })
            .then(() => {
                alert("Taxa criada com sucesso!");
                carregarTaxas();
                setNovaTaxaCriacao({ bandeira: "", debito: "", credito: "", parcelas: "" });
            })
            .catch(() => alert("Erro ao criar taxa!"));
    };

    const handleExcluir = (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta taxa?")) return;

        axios.delete(`http://localhost:3001/taxas/${id}`)
            .then(() => {
                alert("Taxa excluída com sucesso!");
                carregarTaxas();
            })
            .catch(() => alert("Erro ao excluir taxa!"));
    };

    return (
        <div className="gerenciar-taxas">
            <h2>Gerenciar Taxas</h2>

            {/* Tabela de taxas */}
            <table className="taxas-table">
                <thead>
                    <tr>
                        <th>Bandeira</th>
                        <th>Débito</th>
                        <th>Crédito</th>
                        <th>Parcelas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {taxas.map((taxa) => (
                        <tr key={taxa.id}>
                            <td>{taxa.bandeira}</td>
                            <td>{taxa.debito}</td>
                            <td>{taxa.credito}</td>
                            <td>{taxa.parcelas}</td>
                            <td>
                                <button onClick={() => handleExcluir(taxa.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Formulário para atualizar taxas */}
            <div className="atualizar-taxas">
                <h3>Atualizar Taxas</h3>
                <select 
                    value={bandeiraSelecionada} 
                    onChange={(e) => setBandeiraSelecionada(e.target.value)}
                >
                    <option value="">Selecione uma bandeira</option>
                    {taxas.map((taxa) => (
                        <option key={taxa.id} value={taxa.bandeira}>
                            {taxa.bandeira}
                        </option>
                    ))}
                </select>
                <input 
                    type="number" 
                    placeholder="Débito" 
                    value={novaTaxa.debito} 
                    onChange={(e) => setNovaTaxa({ ...novaTaxa, debito: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Crédito" 
                    value={novaTaxa.credito} 
                    onChange={(e) => setNovaTaxa({ ...novaTaxa, credito: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Parcelas" 
                    value={novaTaxa.parcelas} 
                    onChange={(e) => setNovaTaxa({ ...novaTaxa, parcelas: e.target.value })}
                />
                <button onClick={handleAtualizar}>Atualizar Taxas</button>
            </div>

            {/* Formulário para criar novas taxas */}
            <div className="criar-taxas">
                <h3>Criar Nova Taxa</h3>
                <input 
                    type="text" 
                    placeholder="Bandeira" 
                    value={novaTaxaCriacao.bandeira} 
                    onChange={(e) => setNovaTaxaCriacao({ ...novaTaxaCriacao, bandeira: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Débito" 
                    value={novaTaxaCriacao.debito} 
                    onChange={(e) => setNovaTaxaCriacao({ ...novaTaxaCriacao, debito: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Crédito" 
                    value={novaTaxaCriacao.credito} 
                    onChange={(e) => setNovaTaxaCriacao({ ...novaTaxaCriacao, credito: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Parcelas" 
                    value={novaTaxaCriacao.parcelas} 
                    onChange={(e) => setNovaTaxaCriacao({ ...novaTaxaCriacao, parcelas: e.target.value })}
                />
                <button onClick={handleCriar}>Criar Taxa</button>
            </div>
        </div>
    );
}

export default GerenciarTaxas;
