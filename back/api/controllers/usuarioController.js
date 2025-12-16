// back/api/controllers/usuarioController.js
const conexao = require('../../bd/conexao');

// Produtos (dados estáticos para demo)
const produtosEstaticos = [
  { id: 1, nome: 'Mouse Gamer RGB', preco: 149.90, imagem: '../img/mouse.png' },
  { id: 2, nome: 'Teclado Mecânico', preco: 279.90, imagem: '../img/teclado.png' },
  { id: 3, nome: 'Monitor 24" Full HD', preco: 799.90, imagem: '../img/monitor (2).png' },
  { id: 4, nome: 'Headset Gamer 7.1', preco: 189.90, imagem: '../img/headset.png' }
];



exports.cadastrarUsuario = (req, res) => {
  const { nome, email, cpf, telefone, senha, endereco, cidade, cep } = req.body;
  
  const sqlUsuario = 'INSERT INTO usuarios (nome, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)';
  conexao.query(sqlUsuario, [nome, email, cpf, telefone, senha], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    
    const usuarioId = result.insertId;
    
    if (endereco && cidade && cep) {
      const sqlEndereco = 'INSERT INTO enderecos (usuario_id, nome, cep, rua, numero, bairro, cidade, estado, principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      conexao.query(sqlEndereco, [usuarioId, 'Principal', cep, endereco, '0', '', cidade, 'DF', true], (err, endResult) => {
        if (err) {
          console.error('Erro ao cadastrar endereço:', err);
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
  
  const sqlVerificar = 'SELECT senha FROM usuarios WHERE id = ?';
  conexao.query(sqlVerificar, [id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar senha:', err);
      return res.status(500).json({ error: 'Erro ao verificar senha' });
    }
    
    if (results.length === 0 || results[0].senha !== senhaAtual) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }
    
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



exports.criarPedido = (req, res) => {
  const { usuario_id, endereco_id, forma_pagamento_id, itens, total } = req.body;
  
  const sqlPedido = 'INSERT INTO pedidos (usuario_id, endereco_id, forma_pagamento_id, total) VALUES (?, ?, ?, ?)';
  conexao.query(sqlPedido, [usuario_id, endereco_id, forma_pagamento_id, total], (err, result) => {
    if (err) {
      console.error('Erro ao criar pedido:', err);
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
    
    const pedido_id = result.insertId;
    
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
  
  // Buscar dados do usuário
  const sqlUsuario = 'SELECT nome, email FROM usuarios WHERE id = ?';
  conexao.query(sqlUsuario, [id], (err, usuarioResults) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
    
    if (usuarioResults.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const usuario = usuarioResults[0];
    
    // Buscar itens do carrinho
    const sqlCarrinho = 'SELECT * FROM carrinho WHERE usuario_id = ?';
    conexao.query(sqlCarrinho, [id], (err, carrinhoResults) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar carrinho' });
      }
      
      // Mapear produtos estáticos com nomes completos
      const itensCompletos = carrinhoResults.map(item => {
        const produto = produtosEstaticos.find(p => p.id == item.produto_id) || 
                       { nome: 'Produto Indisponível', preco: 0, imagem: '../img/produtos/default.png' };
        
        return {
          produto_id: item.produto_id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
          quantidade: item.quantidade,
          subtotal: produto.preco * item.quantidade
        };
      });
      
      const total = itensCompletos.reduce((sum, item) => sum + item.subtotal, 0);
      
      res.status(200).json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        },
        itens: itensCompletos,
        total: total,
        quantidadeItens: carrinhoResults.length
      });
    });
  });
};

exports.adicionarAoCarrinho = (req, res) => {
  const { id } = req.params;
  const { produto_id, quantidade } = req.body;
  
  // Verificar se o produto existe
  const produto = produtosEstaticos.find(p => p.id == produto_id);
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
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
        res.status(200).json({ message: 'Produto atualizado no carrinho', produto: produto.nome });
      });
    } else {
      const sqlInserir = 'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
      conexao.query(sqlInserir, [id, produto_id, quantidade], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
        }
        res.status(201).json({ message: 'Produto adicionado ao carrinho', produto: produto.nome });
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

exports.listarProdutos = (req, res) => {
  res.status(200).json(produtosEstaticos);
};

exports.obterProduto = (req, res) => {
  const { id } = req.params;
  const produto = produtosEstaticos.find(p => p.id == id);
  
  if (!produto) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  res.status(200).json(produto);
};