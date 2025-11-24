// Adicionar ao carrinho
document.querySelectorAll('.botao-carrinho').forEach(botao => {
  botao.onclick = function() {
    const item = this.closest('.item');
    const produto = {
      nome: item.dataset.nome,
      preco: item.dataset.preco,
      img: item.dataset.img
    };
    
    try {
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    } catch (error) {
      console.error('Erro ao salvar no carrinho:', error);
      return;
    }
    
    this.textContent = 'Adicionado!';
    setTimeout(() => this.textContent = 'Adicionar', 1500);
  };
});