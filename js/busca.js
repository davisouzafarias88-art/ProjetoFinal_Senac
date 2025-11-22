// Busca que funciona em todas as páginas
window.addEventListener('load', function() {
  const input = document.querySelector('.barra-box input');
    const botaoPesquisa = document.querySelector('.botao-pesquisa');
  
  if (!input || !btn) return;
    if (!input || !botaoPesquisa) return;
  
  function buscar() {
    const termo = input.value.toLowerCase().trim();
    const produtos = document.querySelectorAll('.item');
    
    if (!termo) {
      // Mostrar todos os produtos
      produtos.forEach(produto => {
        produto.style.display = 'flex';
        produto.style.border = '';
        produto.style.boxShadow = '';
      });
      return;
    }
    
    let encontrou = false;
    produtos.forEach(produto => {
      const nome = produto.querySelector('h3').textContent.toLowerCase();
      if (nome.includes(termo)) {
        produto.style.display = 'flex';
        if (!encontrou) {
          // Destacar o primeiro encontrado
          produto.scrollIntoView({ behavior: 'smooth', block: 'center' });
          produto.style.border = '3px solid #b700ff';
          produto.style.boxShadow = '0 0 20px rgba(183, 0, 255, 0.5)';
          setTimeout(() => {
            produto.style.border = '';
            produto.style.boxShadow = '';
          }, 3000);
          encontrou = true;
        }
      } else {
        produto.style.display = 'none';
      }
    });
    
    if (!encontrou) {
      alert('Produto não encontrado!');
      // Mostrar todos novamente
      produtos.forEach(produto => produto.style.display = 'flex');
    }
  }
  
  // Filtro em tempo real
  function filtrar() {
    const termo = input.value.toLowerCase().trim();
    const produtos = document.querySelectorAll('.item');
    
    produtos.forEach(produto => {
      const nome = produto.querySelector('h3').textContent.toLowerCase();
      produto.style.display = nome.includes(termo) ? 'flex' : 'none';
    });
  }
  
  input.addEventListener('input', filtrar);
    botaoPesquisa.addEventListener('click', buscar);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscar();
    }
  });
});