const API_URL = 'http://localhost:3000/api';

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login input[type="email"]').value;
    const senha = document.querySelector('#senha input[type="password"]').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            alert('Login realizado com sucesso!');
            window.location.href = '../index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
        console.error(error);
    }
});
