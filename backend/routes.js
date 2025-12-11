const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Cadastro
  router.post('/usuarios', (req, res) => {
    const { nome, email, senha, telefone, cpf } = req.body;
    db.query('INSERT INTO usuarios (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)',
      [nome, email, senha, telefone, cpf], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
      });
  });

  // Login
  router.post('/usuarios/login', (req, res) => {
    const email = req.body.email ? req.body.email.trim() : '';
    const senha = req.body.senha ? req.body.senha.trim() : '';
    
    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      if (result.length > 0) {
        res.json({ success: true, usuario: result[0] });
      } else {
        res.status(401).json({ success: false, error: 'Credenciais inválidas' });
      }
    });
  });

  // Alterar Senha
  router.put('/usuarios/:id/alterar-senha', (req, res) => {
    const { senhaAtual, novaSenha } = req.body;
    
    db.query('SELECT senha FROM usuarios WHERE id = ?', [req.params.id], (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      
      if (result.length === 0) {
        return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
      }
      
      if (result[0].senha !== senhaAtual) {
        return res.status(401).json({ success: false, error: 'Senha atual incorreta' });
      }
      
      db.query('UPDATE usuarios SET senha = ? WHERE id = ?', [novaSenha, req.params.id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, message: 'Senha alterada com sucesso' });
      });
    });
  });

  // Usuários - Atualizar dados
  router.put('/usuarios/:id', (req, res) => {
    const { nome, email, telefone, data_nascimento, genero } = req.body;
    db.query('UPDATE usuarios SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, genero = ? WHERE id = ?',
      [nome, email, telefone, data_nascimento, genero, req.params.id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, result) => {
          if (err) return res.status(400).json({ error: err.message });
          res.json({ success: true, usuario: result[0] });
        });
      });
  });

  // Produtos - Listar
  router.get('/produtos', (req, res) => {
    const categoria = req.query.categoria;
    let query = 'SELECT * FROM produtos WHERE ativo = 1';
    const params = [];
    
    if (categoria) {
      query += ' AND categoria = ?';
      params.push(categoria);
    }
    
    db.query(query, params, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(result);
    });
  });

  // Produto por ID
  router.get('/produtos/:id', (req, res) => {
    db.query('SELECT * FROM produtos WHERE id = ?', [req.params.id], (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      if (result.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(result[0]);
    });
  });

  // Produtos - Pesquisar
  router.get('/produtos/pesquisar', (req, res) => {
    const termo = req.query.q || '';
    if (!termo) {
      return res.status(400).json({ error: 'Termo de busca é obrigatório' });
    }
    db.query('SELECT * FROM produtos WHERE ativo = 1 AND (nome LIKE ? OR descricao LIKE ?)',
      [`%${termo}%`, `%${termo}%`], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result);
      });
  });

  // Carrinho - Adicionar
  router.post('/carrinho', (req, res) => {
    const { usuario_id, produto_id, quantidade } = req.body;
    if (!usuario_id || !produto_id || !quantidade) {
      return res.status(400).json({ error: 'usuario_id, produto_id e quantidade são obrigatórios' });
    }
    db.query('INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)',
      [usuario_id, produto_id, quantidade], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
      });
  });

  // Carrinho - Listar
  router.get('/carrinho', (req, res) => {
    const usuario_id = req.query.usuario_id || req.body.usuario_id;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id é obrigatório' });
    }
    db.query('SELECT c.*, p.nome, p.preco, p.imagem FROM carrinho c JOIN produtos p ON c.produto_id = p.id WHERE c.usuario_id = ?',
      [usuario_id], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result);
      });
  });

  // Carrinho - Remover
  router.delete('/carrinho/:id', (req, res) => {
    db.query('DELETE FROM carrinho WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    });
  });

  // Carrinho - Limpar
  router.delete('/carrinho', (req, res) => {
    const usuario_id = req.query.usuario_id || req.body.usuario_id;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id é obrigatório' });
    }
    db.query('DELETE FROM carrinho WHERE usuario_id = ?', [usuario_id], (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    });
  });

  // Pedidos - Criar
  router.post('/pedidos', (req, res) => {
    const { usuario_id, endereco_id, forma_pagamento_id, total } = req.body;
    db.query('INSERT INTO pedidos (usuario_id, endereco_id, forma_pagamento_id, total, status) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, endereco_id, forma_pagamento_id, total, 'pendente'], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ success: true, pedido_id: result.insertId });
      });
  });

  // Pedidos - Listar
  router.get('/pedidos', (req, res) => {
    const usuario_id = req.query.usuario_id || req.body.usuario_id;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id é obrigatório' });
    }
    db.query('SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY data_pedido DESC',
      [usuario_id], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(result);
      });
  });

  // Pedidos - Buscar por ID
  router.get('/pedidos/:id', (req, res) => {
    db.query('SELECT * FROM pedidos WHERE id = ?', [req.params.id], (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      if (result.length === 0) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      res.json(result[0]);
    });
  });

  return router;
};
