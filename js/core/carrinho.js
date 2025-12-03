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

// Quando a página carrega, ativa os botões de adicionar ao carrinho
document.addEventListener('DOMContentLoaded', function() {
  // Pega todos os botões de adicionar
  document.querySelectorAll('.botao-carrinho').forEach(botao => {
    botao.onclick = function() {
      // Pega o item (produto) mais próximo do botão
      const item = this.closest('.item');
      // Cria um objeto com os dados do produto
      const produto = {
        nome: item.dataset.nome,
        preco: item.dataset.preco,
        imagem: normalizarCaminho(item.dataset.img),
        quantidade: 1
      };
      
      // Pega o carrinho do localStorage ou cria um vazio
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      // Procura se o produto já tá no carrinho
      const itemExistente = carrinho.find(p => p.nome === produto.nome);
      
      // Se já tá, só aumenta a quantidade
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        // Se não tá, adiciona o produto novo
        carrinho.push(produto);
      }
      
      // Salva o carrinho atualizado no localStorage
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      // Muda o texto do botão pra mostrar que foi adicionado
      this.textContent = 'Adicionado!';
      // Depois de 1.5 segundos, volta ao texto original
      setTimeout(() => this.textContent = 'Adicionar', 1500);
    };
  });
});

// Quando a página do carrinho carrega, mostra os produtos
document.addEventListener('DOMContentLoaded', function() {
  // Pega o container onde os itens vão aparecer
  const container = document.getElementById('itens-carrinho');
  // Se não tiver container, sai daqui (não é a página do carrinho)
  if (!container) return;
  
  // Pega o carrinho do localStorage
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  // Pega os elementos da página
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const totalCarrinho = document.getElementById('total-carrinho');
  const valorTotal = document.getElementById('valor-total');
  
  // Se o carrinho tá vazio, mostra a mensagem
  if (carrinho.length === 0) {
    carrinhoVazio.style.display = 'block';
  } else {
    // Se tem produtos, mostra cada um
    let total = 0;
    carrinho.forEach((produto, index) => {
      // Pega a quantidade (ou 1 se não tiver)
      const quantidade = produto.quantidade || 1;
      // Converte o preço pra número
      const precoUnitario = parseFloat(produto.preco);
      // Calcula o preço total (preço x quantidade)
      const precoTotal = precoUnitario * quantidade;
      // Soma no total geral
      total += precoTotal;
      // Arruma o caminho da imagem
      const caminhoImg = normalizarCaminho(produto.imagem || produto.img);
      
      // Monta o HTML do item com imagem, info e botão de remover
      container.innerHTML += `
        <div class="item-carrinho">
          <img src="${caminhoImg}" alt="${produto.nome}" onerror="this.src='/img/placeholder.png'">
          <div class="info-produto">
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${precoUnitario.toFixed(2).replace('.', ',')} x ${quantidade}</p>
            <p class="preco-total">Subtotal: R$ ${precoTotal.toFixed(2).replace('.', ',')}</p>
          </div>
          <button class="botao-remover" onclick="removerItem(${index})">Remover</button>
        </div>
      `;
    });
    // Mostra o total formatado
    valorTotal.textContent = total.toFixed(2).replace('.', ',');
    // Mostra a seção de total
    totalCarrinho.style.display = 'block';
  }
});

// Função pra remover um item do carrinho
function removerItem(index) {
  // Pega o carrinho
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  // Remove o item no índice especificado
  carrinho.splice(index, 1);
  // Salva o carrinho atualizado
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  // Recarrega a página pra atualizar a visualização
  location.reload();
}
