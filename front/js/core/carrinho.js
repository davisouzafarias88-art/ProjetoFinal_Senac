// Função que arruma os caminhos das imagens que vêm de vários lugares
function normalizarCaminho(caminho) {
  // Se não tiver caminho, usa uma imagem padrão
  if (!caminho) return '../../img/produtos/default.png';
  
  // Detectar se está na página do carrinho (subpasta de pages)
  const isCarrinho = window.location.pathname.includes('/carrinho/');
  const prefixo = isCarrinho ? '../../img/' : '../img/';
  
  // Normalizar todos os caminhos para o prefixo correto
  let novoCaminho;
  if (caminho.startsWith('../../../img/')) {
    novoCaminho = caminho.replace('../../../img/', prefixo);
  } else if (caminho.startsWith('../../img/')) {
    novoCaminho = isCarrinho ? caminho : caminho.replace('../../img/', '../img/');
  } else if (caminho.startsWith('../img/')) {
    novoCaminho = isCarrinho ? caminho.replace('../img/', '../../img/') : caminho;
  } else if (caminho.startsWith('/img/')) {
    novoCaminho = caminho.replace('/img/', prefixo);
  } else if (caminho.startsWith('img/')) {
    novoCaminho = prefixo + caminho;
  } else {
    // Se for só o nome do arquivo
    novoCaminho = prefixo + 'produtos/' + caminho;
  }
  
  return novoCaminho;
}

// Adicionar ao carrinho (localStorage)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.botao-carrinho').forEach(botao => {
    botao.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const item = this.closest('.item');
      const nome = item.dataset.nome;
      const preco = item.dataset.preco;
      
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const itemExistente = carrinho.find(p => p.nome === nome);
      
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({
          nome: nome,
          preco: parseFloat(preco),
          imagem: normalizarCaminho(item.dataset.img),
          quantidade: 1
        });
      }
      
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      this.textContent = 'Adicionado!';
      setTimeout(() => this.textContent = 'Adicionar', 1500);
    };
  });
});

// Carregar carrinho do localStorage
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('itens-carrinho');
  if (!container) return;
  
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const totalCarrinho = document.getElementById('total-carrinho');
  const valorTotal = document.getElementById('valor-total');
  
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
  if (carrinho.length === 0) {
    carrinhoVazio.style.display = 'block';
  } else {
    let total = 0;
    carrinho.forEach((item, index) => {
      const precoTotal = item.preco * item.quantidade;
      total += precoTotal;
      const imagem = normalizarCaminho(item.imagem);
      
      container.innerHTML += `
        <div class="item-carrinho">
          <img src="${imagem}" alt="${item.nome}" onerror="this.src='../img/produtos/default.png'">
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

// Função para atualizar contador do carrinho no header (se existir)
function atualizarContadorCarrinho() {
  const contador = document.querySelector('.contador-carrinho');
  if (contador) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    contador.textContent = carrinho.length;
  }
}

// Atualizar contador quando a página carrega
document.addEventListener('DOMContentLoaded', atualizarContadorCarrinho);