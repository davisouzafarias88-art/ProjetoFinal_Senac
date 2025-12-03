// Quando o formulário de login é enviado
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recarregar a página
    
    // Pega o email e senha que o usuário digitou
    const email = document.querySelector('#login input[type="email"]').value;
    const senha = document.querySelector('#senha input[type="password"]').value;
    
    // Busca todos os usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // Procura um usuário que tenha o email E a senha corretos
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    // Se achou o usuário
    if (usuario) {
        // Remove a senha do objeto (por segurança) e guarda o resto
        const { senha: _, ...usuarioSemSenha } = usuario;
        // Salva o usuário logado no localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSemSenha));
        alert('Login realizado com sucesso!');
        // Redireciona pra home
        window.location.href = '../index.html';
    } else {
        // Se não achou, mostra erro
        alert('Email ou senha incorretos!');
    }
});
