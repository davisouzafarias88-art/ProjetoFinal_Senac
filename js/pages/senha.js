document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const senha = document.querySelector('#senha input').value;
    const confirmacao = document.querySelector('#confirmacao input').value;
    
    if (senha !== confirmacao) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter no mínimo 6 caracteres!');
        return;
    }
    
    const dadosCadastro = JSON.parse(sessionStorage.getItem('dadosCadastro'));
    
    if (!dadosCadastro) {
        alert('Dados de cadastro não encontrados.');
        window.location.href = 'cadastro.html';
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...dadosCadastro,
                senha
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            sessionStorage.removeItem('dadosCadastro');
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao cadastrar: ' + (data.error || 'Email já cadastrado'));
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar. Verifique se o servidor está rodando.');
    }
});
