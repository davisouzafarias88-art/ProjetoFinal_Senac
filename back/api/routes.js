// back/api/routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuarioController');

// Rotas de usuários
router.post('/usuarios/cadastro', usuarioController.cadastrarUsuario);
router.post('/usuarios/login', usuarioController.loginUsuario);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.put('/usuarios/:id/alterar-senha', usuarioController.alterarSenha);

// Rotas de produtos
router.get('/produtos', usuarioController.listarProdutos);
router.get('/produtos/:id', usuarioController.obterProduto);

// Rotas de carrinho
router.get('/usuarios/:id/carrinho', usuarioController.obterCarrinho);
router.post('/usuarios/:id/carrinho', usuarioController.adicionarAoCarrinho);
router.delete('/usuarios/:id/carrinho/:produtoId', usuarioController.removerDoCarrinho);

// Rotas de pedidos
router.post('/pedidos', usuarioController.criarPedido);

module.exports = router;
