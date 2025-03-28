import React, { useState } from "react";
import "./../styles/Simulador.css";

const Simulador = () => {
  const [valorVenda, setValorVenda] = useState("");
  const [bandeira, setBandeira] = useState("");
  const [resultado, setResultado] = useState(null);
  const [taxas, setTaxas] = useState([]);
  const [emEdicao, setEmEdicao] = useState(false);

  const taxasCartao = {
    Mastercard: { debito: 0.0089, credito: 0.0304, parcelas: 0.0479 },
    Visa: { debito: 0.0089, credito: 0.0304, parcelas: 0.0479 },
    Hiper: { debito: 0.0169, credito: 0.0384, parcelas: 0.0559 },
    Hipercard: { debito: 0.0169, credito: 0.0384, parcelas: 0.0559 },
    Elo: { debito: 0.0169, credito: 0.0384, parcelas: 0.0559 },
    Amex: { credito: 0.0384, parcelas: 0.0559 },
    Banescard: { debito: 0.0169, credito: 0.0384 },
    Cabal: { debito: 0.0169 },
    Sicred: { debito: 0.0169 },
    Sorocred: { debito: 0.0169 },
  };

  const simular = () => {
    if (!valorVenda || !bandeira) {
      alert(
        "Por favor, insira o valor da venda e selecione a bandeira do cartão."
      );
      return;
    }

    const taxasAplicadas = taxasCartao[bandeira] || {};
    const listaTaxas = [];

    if (taxasAplicadas.debito) {
      listaTaxas.push({
        tipo: "Débito",
        taxa: taxasAplicadas.debito,
        valorTaxa: valorVenda * taxasAplicadas.debito,
        total: valorVenda * (1 + taxasAplicadas.debito),
      });
    }

    if (taxasAplicadas.credito) {
      listaTaxas.push({
        tipo: "Crédito à vista",
        taxa: taxasAplicadas.credito,
        valorTaxa: valorVenda * taxasAplicadas.credito,
        total: valorVenda * (1 + taxasAplicadas.credito),
      });
    }

    if (taxasAplicadas.parcelas) {
      for (let i = 2; i <= 21; i++) {
        listaTaxas.push({
          tipo: `Crédito ${i}x`,
          taxa: taxasAplicadas.parcelas + (i - 2) * 0.008,
          valorTaxa: valorVenda * (taxasAplicadas.parcelas + (i - 2) * 0.008),
          total: valorVenda * (1 + taxasAplicadas.parcelas + (i - 2) * 0.008),
          parcela:
            (valorVenda * (1 + taxasAplicadas.parcelas + (i - 2) * 0.008)) / i,
        });
      }
    }

    setTaxas(listaTaxas);
    setResultado(true);
  };

  const novaSimulacao = () => {
    setValorVenda("");
    setBandeira("");
    setTaxas([]);
    setResultado(null);
    setEmEdicao(false);
  };

  return (
    <div className="simulador">
      <h2>Simulador de Vendas</h2>
      {!resultado && (
        <>
          <div className="input-field">
            <label>Valor da Venda:</label>
            <input
              type="number"
              value={valorVenda}
              onChange={(e) => setValorVenda(e.target.value)}
              placeholder="Digite o valor da venda"
            />
          </div>
          <div className="input-field">
            <label>Bandeira do Cartão:</label>
            <select
              value={bandeira}
              onChange={(e) => setBandeira(e.target.value)}
            >
              <option value="">Selecione a Bandeira</option>
              {Object.keys(taxasCartao).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <button onClick={simular} className="btn-simular">
            Simular
          </button>
        </>
      )}
      {resultado && (
        <>
          {emEdicao ? (
            <div className="input-field">
              <label>Alterar Valor da Venda:</label>
              <input
                type="number"
                value={valorVenda}
                onChange={(e) => setValorVenda(e.target.value)}
              />
              <button onClick={simular} className="btn-atualizar">
                Atualizar Simulação
              </button>
            </div>
          ) : (
            <button onClick={() => setEmEdicao(true)} className="btn-editar">
              Editar Valor
            </button>
          )}
          <div className="lista-taxas-container">
            <ul className="lista-taxas">
              {taxas.map((t, index) => (
                <li key={index}>
                  <strong>{t.tipo}:</strong>
                  Taxa: {t.taxa * 100}% | Valor Taxa: R${" "}
                  {t.valorTaxa.toFixed(2)}| Total: R$ {t.total.toFixed(2)}
                  {t.parcela && ` | Parcela: R$ ${t.parcela.toFixed(2)}`}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={novaSimulacao} className="btn-nova">
            Nova Simulação
          </button>
        </>
      )}
    </div>
  );
};

export default Simulador;