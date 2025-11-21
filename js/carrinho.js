// Adicionar ao carrinho
document.querySelectorAll('.btn-carrinho').forEach(btn => {
  btn.onclick = function() {
    const item = this.closest('.item');
    const produto = {
      nome: item.dataset.nome,
      preco: item.dataset.preco,
      img: item.dataset.img
    };
    
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    this.textContent = 'Adicionado!';
    setTimeout(() => this.textContent = 'Adicionar', 1500);
  };
});