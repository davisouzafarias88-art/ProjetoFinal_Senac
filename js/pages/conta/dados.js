const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

if (usuario) {
  document.getElementById('nome').value = usuario.nome || '';
  document.getElementById('email').value = usuario.email || '';
  document.getElementById('telefone').value = usuario.telefone || '';
  document.getElementById('cpf').value = usuario.cpf || '';
  document.getElementById('nascimento').value = usuario.data_nascimento || '';
  document.getElementById('genero').value = usuario.genero || 'M';
}

document.querySelector('.dados-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const dadosAtualizados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    data_nascimento: document.getElementById('nascimento').value,
    genero: document.getElementById('genero').value
  };
  
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados)
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      alert('Dados atualizados com sucesso!');
    } else {
      alert('Erro ao atualizar dados');
    }
  } catch (error) {
    alert('Erro ao atualizar dados');
  }
});

document.querySelector('.senha-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const senhaAtual = document.getElementById('senha-atual').value;
  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;
  
  if (!senhaAtual) {
    alert('Digite sua senha atual!');
    return;
  }
  
  if (novaSenha !== confirmarSenha) {
    alert('As senhas não conferem!');
    return;
  }
  
  if (novaSenha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres!');
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}/alterar-senha`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senhaAtual, novaSenha })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Senha alterada com sucesso!');
      document.querySelector('.senha-form').reset();
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Erro ao alterar senha');
  }
});
