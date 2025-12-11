// Função que arruma os caminhos das imagens
function normalizarCaminho(caminho) {
  if (!caminho) return '/img/placeholder.png';
  if (caminho.includes('placeholder')) return caminho;
  if (caminho.startsWith('http')) return caminho;
  if (caminho.startsWith('/')) return caminho;
  if (caminho.startsWith('../img/')) return caminho.replace('../img/', '/img/');
  if (caminho.startsWith('img/')) return '/' + caminho;
  return '/img/' + caminho;
}

// Adicionar ao carrinho
function adicionarAoCarrinho(botao) {
  const item = botao.closest('.item');
  const nome = item.dataset.nome;
  const preco = parseFloat(item.dataset.preco);
  const imagem = normalizarCaminho(item.dataset.img);
  
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const itemExistente = carrinho.find(p => p.nome === nome);
  
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }
  
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  botao.textContent = 'Adicionado!';
  setTimeout(() => botao.textContent = 'Adicionar', 1500);
}

// Configurar botões
window.addEventListener('DOMContentLoaded', function() {
  const botoes = document.querySelectorAll('.botao-carrinho');
  botoes.forEach(botao => {
    botao.addEventListener('click', function() {
      adicionarAoCarrinho(this);
    });
  });
});

// Carregar carrinho
window.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('itens-carrinho');
  if (!container) return;
  
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const totalCarrinho = document.getElementById('total-carrinho');
  const valorTotal = document.getElementById('valor-total');
  
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
  container.innerHTML = '';
  
  if (carrinho.length === 0) {
    carrinhoVazio.style.display = 'block';
  } else {
    let total = 0;
    carrinho.forEach((item, index) => {
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
          <button class="botao-remover" onclick="removerItem(${index})">Remover</button>
        </div>
      `;
    });
    valorTotal.textContent = total.toFixed(2).replace('.', ',');
    totalCarrinho.style.display = 'block';
  }
});

// Remover item do carrinho
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  location.reload();
}
