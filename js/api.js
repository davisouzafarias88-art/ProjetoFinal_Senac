const API = {
  baseURL: 'http://localhost:3000/api',

  // PRODUTOS 
  produtos: {
    listar: async (categoria = null) => {
      try {
        const url = categoria ? `${API.baseURL}/produtos?categoria=${categoria}` : `${API.baseURL}/produtos`;
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return [];
      }
    },

    buscar: async (id) => {
      try {
        const response = await fetch(`${API.baseURL}/produtos/${id}`);
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
      }
    },

    pesquisar: async (termo) => {
      try {
        const response = await fetch(`${API.baseURL}/produtos/pesquisar?q=${termo}`);
        return await response.json();
      } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        return [];
      }
    }
  },

  //  USUÁRIOS 
  usuarios: {
    cadastrar: async (dados) => {
      try {
        const response = await fetch(`${API.baseURL}/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return { sucesso: false, mensagem: 'Erro ao cadastrar' };
      }
    },

    login: async (email, senha) => {
      try {
        const response = await fetch(`${API.baseURL}/usuarios/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });
        const data = await response.json();
        if (data.sucesso) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
        }
        return data;
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        return { sucesso: false, mensagem: 'Erro ao fazer login' };
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/pages/layout.html';
    },

    obterDados: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/usuarios/perfil`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao obter dados:', error);
        return null;
      }
    },

    atualizar: async (dados) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/usuarios/perfil`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dados)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        return { sucesso: false, mensagem: 'Erro ao atualizar' };
      }
    }
  },

  // ========== CARRINHO ==========
  carrinho: {
    adicionar: async (produtoId, quantidade = 1) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/carrinho`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ produtoId, quantidade })
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        return { sucesso: false, mensagem: 'Erro ao adicionar' };
      }
    },

    listar: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/carrinho`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao listar carrinho:', error);
        return [];
      }
    },

    atualizar: async (itemId, quantidade) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/carrinho/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ quantidade })
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao atualizar carrinho:', error);
        return { sucesso: false };
      }
    },

    remover: async (itemId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/carrinho/${itemId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        return { sucesso: false };
      }
    },

    limpar: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/carrinho/limpar`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
        return { sucesso: false };
      }
    }
  },

  // ========== PEDIDOS ==========
  pedidos: {
    criar: async (dadosPedido) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/pedidos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dadosPedido)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return { sucesso: false, mensagem: 'Erro ao criar pedido' };
      }
    },

    listar: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/pedidos`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        return [];
      }
    },

    buscar: async (pedidoId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/pedidos/${pedidoId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        return null;
      }
    }
  },

  // ========== ENDEREÇOS ==========
  enderecos: {
    listar: async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/enderecos`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao listar endereços:', error);
        return [];
      }
    },

    adicionar: async (endereco) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/enderecos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(endereco)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao adicionar endereço:', error);
        return { sucesso: false };
      }
    },

    atualizar: async (enderecoId, dados) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/enderecos/${enderecoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(dados)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao atualizar endereço:', error);
        return { sucesso: false };
      }
    },

    remover: async (enderecoId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API.baseURL}/enderecos/${enderecoId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao remover endereço:', error);
        return { sucesso: false };
      }
    }
  },

  // ========== UTILITÁRIOS ==========
  utils: {
    verificarAutenticacao: () => {
      return !!localStorage.getItem('token');
    },

    obterUsuarioLogado: () => {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    },

    formatarPreco: (valor) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor);
    },

    calcularParcelas: (valor, numParcelas = 12) => {
      const parcelas = [];
      for (let i = 1; i <= numParcelas; i++) {
        parcelas.push({
          numero: i,
          valor: valor / i,
          total: valor
        });
      }
      return parcelas;
    }
  }
};

export default API;
