document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.querySelector('#nome_cad input').value;
    const email = document.querySelector('#email_cad input').value;
    const cpf = document.querySelector('#cpf input').value;
    const telefone = document.querySelector('#tel input').value;
    
    sessionStorage.setItem('dadosCadastro', JSON.stringify({
        nome,
        email,
        cpf,
        telefone
    }));
    
    window.location.href = 'senha.html';
});
