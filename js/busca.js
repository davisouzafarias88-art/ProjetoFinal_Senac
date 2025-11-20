document.addEventListener('DOMContentLoaded', function() {
  const inputBusca = document.querySelector('.barra-box input');
  const btnBusca = document.querySelector('.btn-pesquisa');
  
  function buscarProdutos() {
    const termo = inputBusca.value.toLowerCase().trim();
    
    if (termo === '') {
      mostrarTodosProdutos();
      return;
    }
    
    const produtos = document.querySelectorAll('.item');
    let encontrados = 0;
    
    produtos.forEach(produto => {
      const nome = produto.querySelector('h3').textContent.toLowerCase();
      
      if (nome.includes(termo)) {
        produto.style.display = 'flex';
        encontrados++;
      } else {
        produto.style.display = 'none';
      }
    });
    
    if (encontrados === 0) {
      mostrarMensagemNaoEncontrado();
    } else {
      removerMensagemNaoEncontrado();
    }
  }
  
  function mostrarTodosProdutos() {
    const produtos = document.querySelectorAll('.item');
    produtos.forEach(produto => {
      produto.style.display = 'flex';
    });
    removerMensagemNaoEncontrado();
  }
  
  function mostrarMensagemNaoEncontrado() {
    removerMensagemNaoEncontrado();
    
    const gradeItens = document.getElementById('grade-itens');
    const mensagem = document.createElement('div');
    mensagem.id = 'mensagem-nao-encontrado';
    mensagem.innerHTML = `
      <div style="text-align: center; color: white; padding: 50px;">
        <h2>Nenhum produto encontrado</h2>
        <p>Tente buscar por outro termo</p>
      </div>
    `;
    gradeItens.appendChild(mensagem);
  }
  
  function removerMensagemNaoEncontrado() {
    const mensagem = document.getElementById('mensagem-nao-encontrado');
    if (mensagem) {
      mensagem.remove();
    }
  }
  
  // Buscar ao digitar
  inputBusca.addEventListener('input', buscarProdutos);
  
  // Buscar ao clicar no botão
  btnBusca.addEventListener('click', buscarProdutos);
  
  // Buscar ao pressionar Enter
  inputBusca.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscarProdutos();
    }
  });
});