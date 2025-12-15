function navegarParaProduto(nome) {
    window.location.href = `/projetofinal/front/pages/produto.html?produto=${encodeURIComponent(nome)}`;
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
