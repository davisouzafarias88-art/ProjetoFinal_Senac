// Autenticação
document.addEventListener('DOMContentLoaded', function() {
  const formLogin = document.querySelector('form');
  
  if (formLogin && window.location.pathname.includes('login')) {
    formLogin.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.querySelector('input[type="email"]').value;
      const senha = document.querySelector('input[type="password"]').value;
      
      try {
        const usuario = await loginUsuario(email, senha);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        window.location.href = '/projetofinal/front/pages/index.html';
      } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
      }
    });
  }
});

// Verificar se usuário está logado
function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  return usuario;
}

// Fazer logout
function fazerLogout() {
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('carrinho');
  window.location.href = '/projetofinal/front/pages/index.html';
}
