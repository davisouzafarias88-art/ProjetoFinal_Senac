function navegarParaProduto(nome) {
    // Detectar se está na página inicial ou em subpasta
    const currentPath = window.location.pathname;
    let produtoUrl;
    
    if (currentPath.includes('/pages/index.html') || currentPath.endsWith('/pages/')) {
        // Está na pasta pages
        produtoUrl = 'produto.html';
    } else if (currentPath.includes('/categorias/') || currentPath.includes('/conta/') || currentPath.includes('/carrinho/')) {
        // Está em subpasta de pages
        produtoUrl = '../produto.html';
    } else {
        // Está na raiz do projeto
        produtoUrl = 'front/pages/produto.html';
    }
    
    window.location.href = `${produtoUrl}?produto=${encodeURIComponent(nome)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.item').forEach(item => {
        item.style.cursor = 'pointer';
        
        item.onclick = e => {
            if (!e.target.classList.contains('botao-carrinho')) {
                const nome = item.getAttribute('data-nome');
                if (nome) navegarParaProduto(nome);
            }
        };
        
        item.onmouseenter = () => item.style.transform = 'translateY(-5px)';
        item.onmouseleave = () => item.style.transform = 'translateY(0)';
    });
});
