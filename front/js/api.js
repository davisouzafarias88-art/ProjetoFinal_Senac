// API Configuration
const API_URL = 'http://localhost:3000';

// Função para fazer requisições
async function fazerRequisicao(endpoint, opcoes = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...opcoes.headers
      },
      ...opcoes
    });
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// Usuários
async function listarUsuarios() {
  return fazerRequisicao('/usuarios');
}

async function criarUsuario(dados) {
  return fazerRequisicao('/usuarios', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

async function loginUsuario(email, senha) {
  return fazerRequisicao('/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
}

// Produtos
async function listarProdutos() {
  return fazerRequisicao('/produtos');
}

async function obterProduto(id) {
  return fazerRequisicao(`/produtos/${id}`);
}

// Carrinho
async function adicionarAoCarrinho(usuarioId, produtoId, quantidade) {
  return fazerRequisicao('/carrinho', {
    method: 'POST',
    body: JSON.stringify({ usuario_id: usuarioId, produto_id: produtoId, quantidade })
  });
}

async function obterCarrinho(usuarioId) {
  return fazerRequisicao(`/carrinho/${usuarioId}`);
}

async function removerDoCarrinho(carrinhoId) {
  return fazerRequisicao(`/carrinho/${carrinhoId}`, {
    method: 'DELETE'
  });
}

// Pedidos
async function criarPedido(usuarioId, dados) {
  return fazerRequisicao('/pedidos', {
    method: 'POST',
    body: JSON.stringify({ usuario_id: usuarioId, ...dados })
  });
}

async function obterPedidos(usuarioId) {
  return fazerRequisicao(`/pedidos/${usuarioId}`);
}
