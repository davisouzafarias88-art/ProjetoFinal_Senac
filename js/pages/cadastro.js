const API_URL = 'http://localhost:3000/api';

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.querySelector('#nome_cad input').value;
    const email = document.querySelector('#email_cad input').value;
    const cpf = document.querySelector('#cpf input').value;
    const telefone = document.querySelector('#tel input').value;
    const senha = prompt('Digite uma senha:');
    
    if (!senha) {
        alert('Senha é obrigatória!');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, telefone, cpf })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao cadastrar: ' + data.error);
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
        console.error(error);
    }
});
