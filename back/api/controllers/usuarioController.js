// back/api/controllers/usuarioController.js
const conexao = require('../../bd/conexao');

exports.listarUsuarios = (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  conexao.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
    res.status(200).json(results);
  });
};

exports.cadastrarUsuario = (req, res) => {
  const { nome, email, cpf, telefone, senha, endereco, cidade, cep } = req.body;
  
  // Primeiro cria o usuário
  const sqlUsuario = 'INSERT INTO usuarios (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)';
  conexao.query(sqlUsuario, [nome, email, cpf, telefone, senha], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    
    const usuarioId = result.insertId;
    
    // Se tem dados de endereço, salva na tabela enderecos
    if (endereco && cidade && cep) {
      const sqlEndereco = 'INSERT INTO enderecos (usuario_id, nome, cep, rua, numero, bairro, cidade, estado, principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      conexao.query(sqlEndereco, [usuarioId, 'Principal', cep, endereco, '0', '', cidade, 'DF', true], (err, endResult) => {
        if (err) {
          console.error('Erro ao cadastrar endereço:', err);
          // Não retorna erro, pois o usuário já foi criado
        }
      });
    }
    
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', id: usuarioId });
  });
};

exports.loginUsuario = (req, res) => {
  const { email, senha } = req.body;
  
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  conexao.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    
    const usuario = results[0];
    
    // Buscar endereço principal do usuário
    const sqlEndereco = 'SELECT * FROM enderecos WHERE usuario_id = ? AND principal = TRUE LIMIT 1';
    conexao.query(sqlEndereco, [usuario.id], (err, enderecos) => {
      const enderecoPrincipal = enderecos && enderecos.length > 0 ? enderecos[0] : null;
      
      res.status(200).json({ 
        message: 'Login realizado com sucesso', 
        usuario: { 
          id: usuario.id, 
          nome: usuario.nome, 
          email: usuario.email,
          cpf: usuario.cpf,
          telefone: usuario.telefone,
          data_nascimento: usuario.data_nascimento,
          genero: usuario.genero,
          endereco: enderecoPrincipal ? enderecoPrincipal.rua : '',
          cidade: enderecoPrincipal ? enderecoPrincipal.cidade : '',
          cep: enderecoPrincipal ? enderecoPrincipal.cep : ''
        } 
      });
    });
  });
};

exports.atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, telefone, data_nascimento, genero } = req.body;
  
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, cpf = ?, telefone = ?, data_nascimento = ?, genero = ? WHERE id = ?';
  conexao.query(sql, [nome, email, cpf, telefone, data_nascimento, genero, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
    res.status(200).json({ success: true, message: 'Dados atualizados com sucesso' });
  });
};

exports.alterarSenha = (req, res) => {
  const { id } = req.params;
  const { senhaAtual, novaSenha } = req.body;
  
  // Primeiro verifica se a senha atual está correta
  const sqlVerificar = 'SELECT senha FROM usuarios WHERE id = ?';
  conexao.query(sqlVerificar, [id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar senha:', err);
      return res.status(500).json({ error: 'Erro ao verificar senha' });
    }
    
    if (results.length === 0 || results[0].senha !== senhaAtual) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }
    
    // Atualiza a senha
    const sqlAtualizar = 'UPDATE usuarios SET senha = ? WHERE id = ?';
    conexao.query(sqlAtualizar, [novaSenha, id], (err, result) => {
      if (err) {
        console.error('Erro ao alterar senha:', err);
        return res.status(500).json({ error: 'Erro ao alterar senha' });
      }
      res.status(200).json({ success: true, message: 'Senha alterada com sucesso' });
    });
  });
};

exports.listarEnderecos = (req, res) => {
  const { id } = req.params;
  
  const sql = 'SELECT * FROM enderecos WHERE usuario_id = ? AND ativo = TRUE';
  conexao.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar endereços:', err);
      return res.status(500).json({ error: 'Erro ao buscar endereços' });
    }
    res.status(200).json(results);
  });
};

exports.adicionarEndereco = (req, res) => {
  const { id } = req.params;
  const { nome, cep, rua, numero, complemento, bairro, cidade, estado, telefone, principal } = req.body;
  
  const sql = 'INSERT INTO enderecos (usuario_id, nome, cep, rua, numero, complemento, bairro, cidade, estado, telefone, principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  conexao.query(sql, [id, nome, cep, rua, numero, complemento, bairro, cidade, estado, telefone, principal], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar endereço:', err);
      return res.status(500).json({ error: 'Erro ao adicionar endereço' });
    }
    res.status(201).json({ message: 'Endereço adicionado com sucesso', id: result.insertId });
  });
};

exports.criarPedido = (req, res) => {
  const { usuario_id, endereco_id, forma_pagamento_id, itens, total } = req.body;
  
  // Primeiro cria o pedido
  const sqlPedido = 'INSERT INTO pedidos (usuario_id, endereco_id, forma_pagamento_id, total) VALUES (?, ?, ?, ?)';
  conexao.query(sqlPedido, [usuario_id, endereco_id, forma_pagamento_id, total], (err, result) => {
    if (err) {
      console.error('Erro ao criar pedido:', err);
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
    
    const pedido_id = result.insertId;
    
    // Depois adiciona os itens do pedido
    const sqlItens = 'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal) VALUES ?';
    const valoresItens = itens.map(item => [
      pedido_id, 
      item.produto_id, 
      item.quantidade, 
      item.preco_unitario, 
      item.subtotal
    ]);
    
    conexao.query(sqlItens, [valoresItens], (err, result) => {
      if (err) {
        console.error('Erro ao adicionar itens do pedido:', err);
        return res.status(500).json({ error: 'Erro ao adicionar itens do pedido' });
      }
      
      res.status(201).json({ 
        message: 'Pedido criado com sucesso', 
        pedido_id: pedido_id,
        status: 'pendente'
      });
    });
  });
};
exports.obterCarrinho = (req, res) => {
  const { id } = req.params;
  
  const sql = `
    SELECT c.*, p.nome, p.preco, p.imagem 
    FROM carrinho c 
    JOIN produtos p ON c.produto_id = p.id 
    WHERE c.usuario_id = ?
  `;
  
  conexao.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
    res.status(200).json(results);
  });
};

exports.adicionarAoCarrinho = (req, res) => {
  const { id } = req.params;
  const { produto_id, quantidade } = req.body;
  
  const sqlVerificar = 'SELECT * FROM carrinho WHERE usuario_id = ? AND produto_id = ?';
  conexao.query(sqlVerificar, [id, produto_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar carrinho' });
    }
    
    if (results.length > 0) {
      const sqlAtualizar = 'UPDATE carrinho SET quantidade = quantidade + ? WHERE usuario_id = ? AND produto_id = ?';
      conexao.query(sqlAtualizar, [quantidade, id, produto_id], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao atualizar carrinho' });
        }
        res.status(200).json({ message: 'Quantidade atualizada no carrinho' });
      });
    } else {
      const sqlAdicionar = 'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
      conexao.query(sqlAdicionar, [id, produto_id, quantidade], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
        }
        res.status(201).json({ message: 'Produto adicionado ao carrinho' });
      });
    }
  });
};

exports.removerDoCarrinho = (req, res) => {
  const { id, produtoId } = req.params;
  
  const sql = 'DELETE FROM carrinho WHERE usuario_id = ? AND produto_id = ?';
  conexao.query(sql, [id, produtoId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover do carrinho' });
    }
    res.status(200).json({ message: 'Produto removido do carrinho' });
  });
};