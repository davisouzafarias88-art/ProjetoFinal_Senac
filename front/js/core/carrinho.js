// Função que arruma os caminhos das imagens que vêm de vários lugares
function normalizarCaminho(caminho) {
  console.log('Caminho original:', caminho);
  
  // Se não tiver caminho, usa uma imagem padrão
  if (!caminho) return '/projetofinal/front/img/mouse.png';
  
  // Forçar sempre /projetofinal/front/img/ no início
  let novoCominho;
  if (caminho.startsWith('../img/')) {
    novoCominho = caminho.replace('../img/', '/projetofinal/front/img/');
  } else if (caminho.startsWith('/img/')) {
    novoCominho = caminho.replace('/img/', '/projetofinal/front/img/');
  } else if (caminho.startsWith('img/')) {
    novoCominho = '/projetofinal/front/' + caminho;
  } else if (caminho.startsWith('/front/img/')) {
    novoCominho = caminho.replace('/front/img/', '/projetofinal/front/img/');
  } else if (caminho.startsWith('/projetofinal/front/img/')) {
    novoCominho = caminho;
  } else {
    // Se for só o nome do arquivo
    novoCominho = '/projetofinal/front/img/' + caminho;
  }
  
  console.log('Caminho corrigido:', novoCominho);
  return novoCominho;
}

// Adicionar ao carrinho com localStorage
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.botao-carrinho').forEach(botao => {
    botao.onclick = function(e) {
      e.preventDefault();
      const item = this.closest('.item');
      const nome = item.dataset.nome;
      const preco = item.dataset.preco;
      const img = item.dataset.img;
      
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const itemExistente = carrinho.find(p => p.nome === nome);
      
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({
          nome: nome,
          preco: parseFloat(preco),
          imagem: normalizarCaminho(img),
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
  
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
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

