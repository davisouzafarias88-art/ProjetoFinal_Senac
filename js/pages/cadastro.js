document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.querySelector('#nome_cad input').value;
    const email = document.querySelector('#email_cad input').value;
    const cpf = document.querySelector('#cpf input').value;
    const endereco = document.querySelector('#end input').value;
    const cidade = document.querySelector('#cidade_select').value;
    const cep = document.querySelector('#cep input').value;
    const telefone = document.querySelector('#tel input').value;
    
    // Salvar dados no localStorage
    localStorage.setItem('dadosCadastro', JSON.stringify({
        nome,
        email,
        cpf,
        endereco,
        cidade,
        cep,
        telefone
    }));
    
    // Redirecionar para página de senha
    window.location.href = 'senha.html';
});
