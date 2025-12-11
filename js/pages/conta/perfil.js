// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Pega o usuário que tá logado do localStorage 
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    // Se tem usuário, mostra a mensagem personalizada
    if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        if (usuario && usuario.nome) {
            document.querySelector('.boas-vindas h2').textContent = `Olá, ${usuario.nome}! 👋`;
        }
    }
});
