document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login input[type="email"]').value;
    const senha = document.querySelector('#senha input[type="password"]').value;
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        const { senha: _, ...usuarioSemSenha } = usuario;
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSemSenha));
        alert('Login realizado com sucesso!');
        window.location.href = '../index.html';
    } else {
        alert('Email ou senha incorretos!');
    }
});
