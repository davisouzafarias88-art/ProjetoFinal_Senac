// API Configuration
const API_URL = 'http://localhost:3002/api';

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
async function criarUsuario(dados) {
  return fazerRequisicao('/usuarios/cadastro', {
    method: 'POST',
    body: JSON.stringify(dados)
  });
}

async function loginUsuario(email, senha) {
  return fazerRequisicao('/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
}

async function alterarSenha(usuarioId, senhaAtual, novaSenha) {
  return fazerRequisicao(`/usuarios/${usuarioId}/alterar-senha`, {
    method: 'PUT',
    body: JSON.stringify({ senhaAtual, novaSenha })
  });
}

// Produtos
async function listarProdutos() {
  return fazerRequisicao('/produtos');
}

// Carrinho
async function adicionarAoCarrinho(usuarioId, produtoId, quantidade) {
  return fazerRequisicao(`/usuarios/${usuarioId}/carrinho`, {
    method: 'POST',
    body: JSON.stringify({ produto_id: produtoId, quantidade })
  });
}

async function obterCarrinho(usuarioId) {
  return fazerRequisicao(`/usuarios/${usuarioId}/carrinho`);
}

async function removerDoCarrinho(usuarioId, produtoId) {
  return fazerRequisicao(`/usuarios/${usuarioId}/carrinho/${produtoId}`, {
    method: 'DELETE'
  });
}
