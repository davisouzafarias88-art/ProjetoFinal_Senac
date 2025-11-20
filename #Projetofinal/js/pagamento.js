document.addEventListener('DOMContentLoaded', function() {
  carregarResumoCarrinho();
  configurarFormulario();
});

function carregarResumoCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const container = document.getElementById('itens-resumo');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total-final');
  
  if (carrinho.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #999;">Carrinho vazio</p>';
    return;
  }
  
  let subtotal = 0;
  container.innerHTML = '';
  
  carrinho.forEach(produto => {
    const preco = parseFloat(produto.preco);
    subtotal += preco;
    
    const item = document.createElement('div');
    item.className = 'item-resumo';
    item.innerHTML = `
      <span>${produto.nome}</span>
      <span>R$ ${produto.preco.replace('.', ',')}</span>
    `;
    container.appendChild(item);
  });
  
  const frete = 15.90;
  const total = subtotal + frete;
  
  subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function configurarFormulario() {
  // Alternar detalhes do cartão baseado na forma de pagamento
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const cardDetails = document.getElementById('card-details');
  
  paymentOptions.forEach(option => {
    option.addEventListener('change', function() {
      if (this.value === 'pix') {
        cardDetails.style.display = 'none';
      } else {
        cardDetails.style.display = 'block';
      }
    });
  });
  
  // Máscara para CPF
  const cpfInput = document.querySelector('input[placeholder="CPF"]');
  if (cpfInput) {
    cpfInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      this.value = value;
    });
  }
  
  // Máscara para telefone
  const telInput = document.querySelector('input[placeholder="Telefone"]');
  if (telInput) {
    telInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      this.value = value;
    });
  }
  
  // Máscara para CEP
  const cepInput = document.querySelector('input[placeholder="CEP"]');
  if (cepInput) {
    cepInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      this.value = value;
    });
  }
  
  // Máscara para cartão
  const cardInput = document.querySelector('input[placeholder="Número do cartão"]');
  if (cardInput) {
    cardInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{4})(\d)/, '$1 $2');
      value = value.replace(/(\d{4})(\d)/, '$1 $2');
      value = value.replace(/(\d{4})(\d)/, '$1 $2');
      this.value = value;
    });
  }
  
  // Máscara para data do cartão
  const dateInput = document.querySelector('input[placeholder="MM/AA"]');
  if (dateInput) {
    dateInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '$1/$2');
      this.value = value;
    });
  }
}

function finalizarCompra() {
  // Validar formulário
  const requiredFields = document.querySelectorAll('input[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ff4757';
      isValid = false;
    } else {
      field.style.borderColor = 'rgba(183, 0, 255, 0.3)';
    }
  });
  
  if (!isValid) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  
  // Simular processamento
  const btn = document.querySelector('.btn-finalizar');
  const originalText = btn.innerHTML;
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
  btn.disabled = true;
  
  setTimeout(() => {
    // Limpar carrinho
    localStorage.removeItem('carrinho');
    
    // Mostrar sucesso
    alert('Compra realizada com sucesso! Você receberá um e-mail de confirmação.');
    
    // Redirecionar
    window.location.href = '/html/layout.html';
  }, 2000);
}