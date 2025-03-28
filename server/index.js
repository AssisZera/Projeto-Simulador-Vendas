const express = require("express");
const app = express();
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    port:"3306",
    password:"admin",
    database:"crudeletrica",
})

app.use(cors());
app.use(express.json());

// Validar os dados do banco para autenticação na conta
app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    const SQL = "SELECT * FROM login WHERE usuario = ? AND senha = ?";
    db.query(SQL, [usuario, senha], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro no servidor" });
        } else if (result.length > 0) {
            res.status(200).json({ success: true, message: "Login bem-sucedido!" });
        } else {
            res.status(401).json({ success: false, message: "Usuário ou senha inválidos!" });
        }
    });
});


// 
// Criar um novo usuário
app.post("/usuarios", (req, res) => {
    const { usuario, senha } = req.body;

    const SQL = "INSERT INTO login (usuario, senha) VALUES (?, ?)";
    db.query(SQL, [usuario, senha], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao criar usuário" });
        } else {
            res.status(200).json({ success: true, message: "Usuário criado com sucesso!" });
        }
    });
});

// Consultar todos os usuários
app.get("/usuarios", (req, res) => {
    const SQL = "SELECT id, usuario FROM login";
    db.query(SQL, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao buscar usuários" });
        } else {
            res.status(200).json(result);
        }
    });
});

// Atualizar usuário
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { usuario, senha } = req.body;

    const SQL = "UPDATE login SET usuario = ?, senha = ? WHERE id = ?";
    db.query(SQL, [usuario, senha, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        } else {
            res.status(200).json({ success: true, message: "Usuário atualizado com sucesso!" });
        }
    });
});

// Excluir usuário
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    const SQL = "DELETE FROM login WHERE id = ?";
    db.query(SQL, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao excluir usuário" });
        } else {
            res.status(200).json({ success: true, message: "Usuário excluído com sucesso!" });
        }
    });
});








/// GerenciarTaxas


// Aqui é onde posso consultar as taxas
app.get("/taxas", (req, res) => {
    const SQL = "SELECT * FROM taxas";
    db.query(SQL, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao buscar taxas" });
        } else {
            res.status(200).json(result);
        }
    });
});

// Aqui é onde posso atualizar os dados das taxas
app.put("/taxas", (req, res) => {
    const { bandeira, debito, credito, parcelas } = req.body;

    const SQL = `
        UPDATE taxas 
        SET debito = ?, credito = ?, parcelas = ? 
        WHERE bandeira = ?`;

    db.query(SQL, [debito, credito, parcelas, bandeira], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao atualizar taxa" });
        } else {
            res.status(200).json({ success: true, message: "Taxa atualizada com sucesso!" });
        }
    });
});

// Criar taxas
app.post("/taxas", (req, res) => {
    const { bandeira, debito, credito, parcelas } = req.body;

    const SQL = `
        INSERT INTO taxas (bandeira, debito, credito, parcelas)
        VALUES (?, ?, ?, ?)
    `;

    db.query(SQL, [bandeira, debito, credito, parcelas], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao criar taxa" });
        } else {
            res.status(200).json({ success: true, message: "Taxa criada com sucesso!" });
        }
    });
});

// Excluir taxas
app.delete("/taxas/:id", (req, res) => {
    const { id } = req.params;

    const SQL = `
        DELETE FROM taxas 
        WHERE id = ?
    `;

    db.query(SQL, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao excluir taxa" });
        } else {
            res.status(200).json({ success: true, message: "Taxa excluída com sucesso!" });
        }
    });
});


app.listen(3001,()=>{
    console.log("rodando servidor");
});