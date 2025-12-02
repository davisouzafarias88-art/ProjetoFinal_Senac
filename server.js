const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ MySQL conectado!');
});

// Cadastro
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha, telefone, cpf } = req.body;
    db.query('INSERT INTO usuarios (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)',
        [nome, email, senha, telefone, cpf], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ success: true, id: result.insertId });
        });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        if (result.length > 0) {
            res.json({ success: true, usuario: result[0] });
        } else {
            res.status(401).json({ success: false, error: 'Credenciais inválidas' });
        }
    });
});

// Produtos
app.get('/api/produtos', (req, res) => {
    db.query('SELECT * FROM produtos WHERE ativo = 1', (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result);
    });
});

// Produto por ID
app.get('/api/produtos/:id', (req, res) => {
    db.query('SELECT * FROM produtos WHERE id = ?', [req.params.id], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result[0]);
    });
});

// Carrinho e Adicionar
app.post('/api/carrinho', (req, res) => {
    const { usuario_id, produto_id, quantidade } = req.body;
    db.query('INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)',
        [usuario_id, produto_id, quantidade], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ success: true, id: result.insertId });
        });
});

// Carrinho e Listar
app.get('/api/carrinho/:usuario_id', (req, res) => {
    db.query('SELECT c.*, p.nome, p.preco, p.imagem FROM carrinho c JOIN produtos p ON c.produto_id = p.id WHERE c.usuario_id = ?',
        [req.params.usuario_id], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json(result);
        });
});

// Carrinho - Remover
app.delete('/api/carrinho/:id', (req, res) => {
    db.query('DELETE FROM carrinho WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true });
    });
});

// Pedidos - Criar
app.post('/api/pedidos', (req, res) => {
    const { usuario_id, endereco_id, forma_pagamento_id, total } = req.body;
    db.query('INSERT INTO pedidos (usuario_id, endereco_id, forma_pagamento_id, total) VALUES (?, ?, ?, ?)',
        [usuario_id, endereco_id, forma_pagamento_id, total], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ success: true, pedido_id: result.insertId });
        });
});

// Pedidos e Listar
app.get('/api/pedidos/:usuario_id', (req, res) => {
    db.query('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY data_pedido DESC',
        [req.params.usuario_id], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json(result);
        });
});

app.listen(3000, () => console.log(' API rodando na porta 3000'));
