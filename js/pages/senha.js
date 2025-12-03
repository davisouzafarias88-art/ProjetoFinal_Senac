document.querySelector('form').addEventListener('submit', (e) => {
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
    
    const dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro'));
    
    if (!dadosCadastro) {
        alert('Dados de cadastro não encontrados. Por favor, preencha o formulário novamente.');
        window.location.href = 'cadastro.html';
        return;
    }
    
    // Salvar usuário completo no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar se email já existe
    if (usuarios.find(u => u.email === dadosCadastro.email)) {
        alert('Este email já está cadastrado!');
        return;
    }
    
    usuarios.push({
        ...dadosCadastro,
        senha,
        id: Date.now()
    });
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.removeItem('dadosCadastro');
    
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
});
