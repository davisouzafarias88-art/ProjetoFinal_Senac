// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Pega o usuário que tá logado do localStorage 
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    // Se tem usuário && tem nome, mostra a mensagem personalizada
    // Verifica se tem usuário logado E se tem nome
    if (usuarioLogado && usuarioLogado.nome) {
        document.querySelector('.boas-vindas h2').textContent = `Olá, ${usuarioLogado.nome}! 👋`;
    } else {
        // Se não tá logado, manda pro login
        window.location.href = '/pages/autenticacao/login.html';
    }
});
