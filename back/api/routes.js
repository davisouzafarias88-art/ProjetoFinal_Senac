// back/api/routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuarioController');

router.get('/usuarios', usuarioController.listarUsuarios);
router.post('/usuarios/cadastro', usuarioController.cadastrarUsuario);
router.post('/usuarios/login', usuarioController.loginUsuario);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.put('/usuarios/:id/alterar-senha', usuarioController.alterarSenha);

// Rotas de endereços
router.get('/usuarios/:id/enderecos', usuarioController.listarEnderecos);
router.post('/usuarios/:id/enderecos', usuarioController.adicionarEndereco);

// Rotas de pedidos
router.post('/pedidos', usuarioController.criarPedido);

// Rotas de carrinho
router.get('/usuarios/:id/carrinho', usuarioController.obterCarrinho);
router.post('/usuarios/:id/carrinho', usuarioController.adicionarAoCarrinho);
router.delete('/usuarios/:id/carrinho/:produtoId', usuarioController.removerDoCarrinho);

module.exports = router;
