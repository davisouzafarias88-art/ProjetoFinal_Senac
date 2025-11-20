document.addEventListener('DOMContentLoaded', function() {
  const inputBusca = document.querySelector('.barra-box input');
  const btnBusca = document.querySelector('.btn-pesquisa');
  
  function buscarProdutos() {
    const termo = inputBusca.value.toLowerCase().trim();
    
    if (termo === '') {
      mostrarTodosItens();
      return;
    }
    
    const itens = document.querySelectorAll('.item-carrinho');
    let encontrados = 0;
    
    itens.forEach(item => {
      const nome = item.querySelector('h3').textContent.toLowerCase();
      
      if (nome.includes(termo)) {
        item.style.display = 'flex';
        encontrados++;
      } else {
        item.style.display = 'none';
      }
    });
    
    if (encontrados === 0 && itens.length > 0) {
      mostrarMensagemNaoEncontrado();
    } else {
      removerMensagemNaoEncontrado();
    }
  }
  
  function mostrarTodosItens() {
    const itens = document.querySelectorAll('.item-carrinho');
    itens.forEach(item => {
      item.style.display = 'flex';
    });
    removerMensagemNaoEncontrado();
  }
  
  function mostrarMensagemNaoEncontrado() {
    removerMensagemNaoEncontrado();
    
    const container = document.getElementById('itens-carrinho');
    const mensagem = document.createElement('div');
    mensagem.id = 'mensagem-nao-encontrado';
    mensagem.innerHTML = `
      <div style="text-align: center; color: white; padding: 30px;">
        <h3>Nenhum item encontrado no carrinho</h3>
        <p>Tente buscar por outro termo</p>
      </div>
    `;
    container.appendChild(mensagem);
  }
  
  function removerMensagemNaoEncontrado() {
    const mensagem = document.getElementById('mensagem-nao-encontrado');
    if (mensagem) {
      mensagem.remove();
    }
  }
  
  // Aguardar os itens do carrinho serem carregados
  setTimeout(() => {
    inputBusca.addEventListener('input', buscarProdutos);
    btnBusca.addEventListener('click', buscarProdutos);
    inputBusca.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        buscarProdutos();
      }
    });
  }, 500);
});