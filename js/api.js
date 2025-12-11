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

  // USUÁRIOS 
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
        if (data.success) {
          localStorage.setItem('usuario_id', data.usuario.id);
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
        }
        return data;
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        return { success: false, mensagem: 'Erro ao fazer login' };
      }
    },

    logout: () => {
      localStorage.removeItem('usuario_id');
      localStorage.removeItem('usuario');
      window.location.href = '/html/layout.html';
    },

    atualizar: async (id, dados) => {
      try {
        const response = await fetch(`${API.baseURL}/usuarios/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        return { success: false, mensagem: 'Erro ao atualizar' };
      }
    },

    alterarSenha: async (id, senhaAtual, novaSenha) => {
      try {
        const response = await fetch(`${API.baseURL}/usuarios/${id}/alterar-senha`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ senhaAtual, novaSenha })
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao alterar senha:', error);
        return { success: false, mensagem: 'Erro ao alterar senha' };
      }
    }
  },

  // CARRINHO
  carrinho: {
    adicionar: async (usuario_id, produto_id, quantidade = 1) => {
      try {
        const response = await fetch(`${API.baseURL}/carrinho`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id, produto_id, quantidade })
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        return { success: false, mensagem: 'Erro ao adicionar' };
      }
    },

    listar: async (usuario_id) => {
      try {
        const response = await fetch(`${API.baseURL}/carrinho?usuario_id=${usuario_id}`);
        return await response.json();
      } catch (error) {
        console.error('Erro ao listar carrinho:', error);
        return [];
      }
    },

    remover: async (itemId) => {
      try {
        const response = await fetch(`${API.baseURL}/carrinho/${itemId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        return { success: false };
      }
    },

    limpar: async (usuario_id) => {
      try {
        const response = await fetch(`${API.baseURL}/carrinho?usuario_id=${usuario_id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
        return { success: false };
      }
    }
  },

  // PEDIDOS
  pedidos: {
    criar: async (usuario_id, endereco_id, forma_pagamento_id, total) => {
      try {
        const response = await fetch(`${API.baseURL}/pedidos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id, endereco_id, forma_pagamento_id, total })
        });
        return await response.json();
      } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return { success: false, mensagem: 'Erro ao criar pedido' };
      }
    },

    listar: async (usuario_id) => {
      try {
        const response = await fetch(`${API.baseURL}/pedidos?usuario_id=${usuario_id}`);
        return await response.json();
      } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        return [];
      }
    },

    buscar: async (pedidoId) => {
      try {
        const response = await fetch(`${API.baseURL}/pedidos/${pedidoId}`);
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        return null;
      }
    }
  }
};
