// Função para navegar para página do produto
function navegarParaProduto(nomeProduto) {
    const url = `/pages/produto.html?produto=${encodeURIComponent(nomeProduto)}`;
    window.location.href = url;
}

// Adicionar event listeners aos produtos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const itens = document.querySelectorAll('.item');
    
    itens.forEach(item => {
        // Tornar todo o item clicável
        item.style.cursor = 'pointer';
        
        // Adicionar evento de clique no item inteiro
        item.addEventListener('click', function(e) {
            // Verificar se o clique não foi no botão de adicionar ao carrinho
            if (!e.target.classList.contains('botao-carrinho')) {
                const nomeProduto = this.getAttribute('data-nome');
                if (nomeProduto) {
                    navegarParaProduto(nomeProduto);
                }
            }
        });
        
        // Adicionar efeito hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});