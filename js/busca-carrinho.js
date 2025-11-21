// Busca no carrinho
setTimeout(() => {
  const input = document.querySelector('.barra-box input');
  const btn = document.querySelector('.btn-pesquisa');
  
  function buscar() {
    const termo = input.value.toLowerCase();
    const itens = document.querySelectorAll('.item-carrinho');
    
    itens.forEach(item => {
      const nome = item.querySelector('h3').textContent.toLowerCase();
      item.style.display = nome.includes(termo) ? 'flex' : 'none';
    });
  }
  
  input.oninput = buscar;
  btn.onclick = buscar;
  input.onkeypress = (e) => e.key === 'Enter' && buscar();
}, 500);