// Função que arruma os caminhos das imagens que vêm de vários lugares
function normalizarCaminho(caminho) {
  // Se não tiver caminho, usa uma imagem padrão
  if (!caminho) return '/img/placeholder.png';
  // Se já for um placeholder, deixa como tá
  if (caminho.includes('placeholder')) return caminho;
  // Se for URL externa (http), deixa como tá
  if (caminho.startsWith('http')) return caminho;
  // Se já começar com /, tá bom
  if (caminho.startsWith('/')) return caminho;
  // Se for caminho relativo antigo, converte pra novo
  if (caminho.startsWith('../img/')) return caminho.replace('../img/', '/img/');
  // Se for só "img/", adiciona a barra no começo
  if (caminho.startsWith('img/')) return '/' + caminho;
  // Se nada disso, assume que é só o nome do arquivo e coloca em /img/
  return '/img/' + caminho;
}

// Adicionar ao carrinho com API
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.botao-carrinho').forEach(botao => {
    botao.onclick = async function() {
      const item = this.closest('.item');
      const produtoId = item.dataset.id;
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
      
      if (!usuario) {
        alert('Faça login para adicionar ao carrinho!');
        window.location.href = '/pages/autenticacao/login.html';
        return;
      }
      
      try {
        const response = await fetch('http://localhost:3000/api/carrinho', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario_id: usuario.id,
            produto_id: produtoId,
            quantidade: 1
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          this.textContent = 'Adicionado!';
          setTimeout(() => this.textContent = 'Adicionar', 1500);
        } else {
          alert('Erro ao adicionar ao carrinho');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar. Servidor offline.');
      }
    };
  });
});

// Carregar carrinho da API
document.addEventListener('DOMContentLoaded', async function() {
  const container = document.getElementById('itens-carrinho');
  if (!container) return;
  
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const totalCarrinho = document.getElementById('total-carrinho');
  const valorTotal = document.getElementById('valor-total');
  
  if (!usuario) {
    carrinhoVazio.innerHTML = '<p>Faça login para ver seu carrinho</p>';
    carrinhoVazio.style.display = 'block';
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/carrinho/${usuario.id}`);
    const carrinho = await response.json();
    
    if (carrinho.length === 0) {
      carrinhoVazio.style.display = 'block';
    } else {
      let total = 0;
      carrinho.forEach((item) => {
        const precoTotal = item.preco * item.quantidade;
        total += precoTotal;
        
        container.innerHTML += `
          <div class="item-carrinho">
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="info-produto">
              <h3>${item.nome}</h3>
              <p class="preco">R$ ${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade}</p>
              <p class="preco-total">Subtotal: R$ ${precoTotal.toFixed(2).replace('.', ',')}</p>
            </div>
            <button class="botao-remover" onclick="removerItem(${item.id})">Remover</button>
          </div>
        `;
      });
      valorTotal.textContent = total.toFixed(2).replace('.', ',');
      totalCarrinho.style.display = 'block';
    }
  } catch (error) {
    console.error('Erro:', error);
    carrinhoVazio.innerHTML = '<p>Erro ao carregar carrinho</p>';
    carrinhoVazio.style.display = 'block';
  }
});

// Remover item do carrinho via API
async function removerItem(itemId) {
  try {
    const response = await fetch(`http://localhost:3000/api/carrinho/${itemId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      location.reload();
    } else {
      alert('Erro ao remover item');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao remover. Servidor offline.');
  }
}
