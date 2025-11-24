// Carregar resumo do carrinho
function carregarResumo() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho'));
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
    }
  });
  
  if (!valido) {
    alert('Preencha todos os campos!');
    return;
  }
  
  localStorage.removeItem('carrinho');
  alert('Compra realizada com sucesso!');
  window.location.href = '/html/layout.html';
}

carregarResumo();