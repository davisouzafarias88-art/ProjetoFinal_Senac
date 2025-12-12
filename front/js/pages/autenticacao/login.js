document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login input[type="email"]').value.trim();
    const senha = document.querySelector('#senha input[type="password"]').value.trim();
    
    if (!email || !senha) {
        alert('Preencha email e senha!');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3002/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (response.ok && data.usuario) {
            delete data.usuario.senha;
            localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
            alert('Login realizado com sucesso!');
            window.location.href = '/projetofinal/front/pages/index.html';
        } else {
            alert(data.error || 'Email ou senha incorretos!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Verifique se o servidor está rodando.');
    }
});