document.addEventListener('DOMContentLoaded', function() {
  const botoes = document.querySelectorAll('.btn-carrinho');
  
  botoes.forEach(botao => {
    botao.addEventListener('click', function() {
      const item = this.closest('.item');
      const produto = {
        nome: item.dataset.nome,
        preco: item.dataset.preco,
        img: item.dataset.img
      };
      
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      
      this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar';
      }, 2000);
    });
  });
});