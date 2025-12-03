// Preencher dados do usuário logado
function preencherDadosUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  
  console.log('Usuário logado:', usuario);
  
  if (usuario) {
    const formSections = document.querySelectorAll('.form-section');
    
    // Dados Pessoais 
    const dadosPessoais = formSections[0].querySelectorAll('input');
    dadosPessoais[0].value = usuario.nome || '';
    dadosPessoais[1].value = usuario.email || '';
    dadosPessoais[2].value = usuario.telefone || '';
    dadosPessoais[3].value = usuario.cpf || '';
    
    // Endereço de Entrega 
    const enderecoInputs = formSections[1].querySelectorAll('input');
    enderecoInputs[0].value = usuario.cep || '';
    enderecoInputs[1].value = usuario.endereco || '';
    enderecoInputs[4].value = usuario.cidade || '';
    
    console.log('Dados preenchidos com sucesso!');
  } else {
    console.log('Nenhum usuário logado encontrado');
  }
}

// Carregar resumo do carrinho
function carregarResumo() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  const container = document.getElementById('itens-resumo');
  
  if (!carrinho.length) {
    container.innerHTML = '<p>Carrinho vazio</p>';
    return;
  }
  
  let subtotal = 0;
  container.innerHTML = '';
  
  carrinho.forEach(produto => {
    subtotal += parseFloat(produto.preco);
    container.innerHTML += `<div><span>${produto.nome}</span><span>R$ ${produto.preco.replace('.', ',')}</span></div>`;
  });
  
  const total = subtotal + 15.90;
  document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('total-final').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Finalizar compra
function finalizarCompra() {
  const campos = document.querySelectorAll('input[required]');
  let valido = true;
  
  campos.forEach(campo => {
    if (!campo.value.trim()) {
      campo.style.borderColor = 'red';
      valido = false;
    } else {
      campo.style.borderColor = '';
    }
  });
  
  if (!valido) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }
  
  localStorage.removeItem('carrinho');
  alert('Compra realizada com sucesso!');
  window.location.href = '/pages/index.html';
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  preencherDadosUsuario();
  carregarResumo();
});