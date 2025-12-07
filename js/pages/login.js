// Login com API
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login input[type="email"]').value;
    const senha = document.querySelector('#senha input[type="password"]').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (data.success) {
            delete data.usuario.senha;
            localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
            alert('Login realizado com sucesso!');
            window.location.href = '../index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Verifique se o servidor está rodando.');
    }
});
