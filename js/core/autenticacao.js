// Verifica se usuário está logado e ajusta o link de Conta
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const linkConta = document.querySelector('nav a[href*="conta"]') || 
                      document.querySelector('nav a[href*="perfil"]');
    
    if (linkConta) {
        if (usuarioLogado) {
            linkConta.href = '/pages/conta/perfil.html';
        } else {
            linkConta.href = '/pages/autenticacao/login.html';
        }
    }
});
