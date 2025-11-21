// Busca que funciona
window.addEventListener('load', function() {
  const input = document.querySelector('.barra-box input');
  const btn = document.querySelector('.btn-pesquisa');
  
  function buscar() {
    const termo = input.value.toLowerCase().trim();
    if (!termo) return;
    
    const produtos = document.querySelectorAll('.item');
    let encontrou = false;
    
    produtos.forEach(produto => {
      const nome = produto.querySelector('h3').textContent.toLowerCase();
      if (nome.includes(termo) && !encontrou) {
        produto.scrollIntoView({ behavior: 'smooth', block: 'center' });
        produto.style.border = '3px solid #b700ff';
        produto.style.boxShadow = '0 0 20px rgba(183, 0, 255, 0.5)';
        setTimeout(() => {
          produto.style.border = '';
          produto.style.boxShadow = '';
        }, 3000);
        encontrou = true;
      }
    });
    
    if (!encontrou) {
      alert('Produto não encontrado!');
    }
  }
  
  btn.addEventListener('click', buscar);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscar();
    }
  });
});