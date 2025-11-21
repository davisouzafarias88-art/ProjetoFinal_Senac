document.addEventListener('DOMContentLoaded', function() {
  const inputBusca = document.querySelector('.barra-box input');
  const btnBusca = document.querySelector('.btn-pesquisa');
  const barraBox = document.querySelector('.barra-box');
  
  // Criar dropdown
  const dropdown = document.createElement('div');
  dropdown.id = 'dropdown-busca';
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
    border: 2px solid #b700ff;
    border-top: none;
    border-radius: 0 0 15px 15px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
    box-shadow: 0 8px 25px rgba(183, 0, 255, 0.4);
    backdrop-filter: blur(10px);
  `;
  barraBox.appendChild(dropdown);
  
  // Coletar todos os produtos
  function coletarProdutos() {
    const produtos = [];
    document.querySelectorAll('.item h3').forEach(h3 => {
      produtos.push({
        nome: h3.textContent.trim(),
        elemento: h3.closest('.item')
      });
    });
    return produtos;
  }
  
  function mostrarSugestoes() {
    const termo = inputBusca.value.toLowerCase().trim();
    
    if (termo === '') {
      dropdown.style.display = 'none';
      return;
    }
    
    const produtos = coletarProdutos();
    const sugestoes = produtos.filter(produto => 
      produto.nome.toLowerCase().includes(termo)
    );
    
    if (sugestoes.length === 0) {
      dropdown.innerHTML = `
        <div style="
          padding: 15px 20px;
          text-align: center;
          color: #999;
          font-style: italic;
        ">
          <i class="fas fa-search" style="margin-right: 8px; color: #b700ff;"></i>
          Nenhum produto encontrado
        </div>
      `;
      dropdown.style.display = 'block';
      return;
    }
    
    dropdown.innerHTML = '';
    sugestoes.forEach((produto, index) => {
      const item = document.createElement('div');
      item.style.cssText = `
        padding: 12px 20px;
        cursor: pointer;
        color: white;
        border-bottom: 1px solid rgba(183, 0, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        font-weight: 500;
        position: relative;
        overflow: hidden;
      `;
      
      // Adicionar ícone
      const icon = document.createElement('i');
      icon.className = 'fas fa-search';
      icon.style.cssText = `
        margin-right: 10px;
        color: #b700ff;
        font-size: 0.9rem;
      `;
      
      const text = document.createElement('span');
      text.textContent = produto.nome;
      
      item.appendChild(icon);
      item.appendChild(text);
      
      // Efeito hover
      item.addEventListener('mouseenter', () => {
        item.style.background = 'linear-gradient(135deg, #b700ff 0%, #9010c3 100%)';
        item.style.transform = 'translateX(5px)';
        item.style.boxShadow = '0 4px 15px rgba(183, 0, 255, 0.3)';
        icon.style.color = 'white';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
        item.style.transform = 'translateX(0)';
        item.style.boxShadow = 'none';
        icon.style.color = '#b700ff';
      });
      
      item.addEventListener('click', () => {
        inputBusca.value = produto.nome;
        dropdown.style.display = 'none';
        scrollParaProduto(produto.elemento);
      });
      
      dropdown.appendChild(item);
    });
    
    dropdown.style.display = 'block';
  }
  
  function scrollParaProduto(elemento) {
    elemento.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // Destacar produto com animação mais elaborada
    elemento.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    elemento.style.transform = 'scale(1.08) rotate(1deg)';
    elemento.style.boxShadow = '0 15px 40px rgba(183, 0, 255, 0.6)';
    elemento.style.border = '3px solid #b700ff';
    elemento.style.background = 'linear-gradient(135deg, rgba(183, 0, 255, 0.1) 0%, rgba(144, 16, 195, 0.1) 100%)';
    
    // Efeito de pulso
    let pulseCount = 0;
    const pulseInterval = setInterval(() => {
      elemento.style.boxShadow = pulseCount % 2 === 0 
        ? '0 15px 40px rgba(183, 0, 255, 0.8)' 
        : '0 15px 40px rgba(183, 0, 255, 0.4)';
      pulseCount++;
      if (pulseCount >= 6) clearInterval(pulseInterval);
    }, 300);
    
    setTimeout(() => {
      elemento.style.transform = '';
      elemento.style.boxShadow = '';
      elemento.style.border = '';
      elemento.style.background = '';
      elemento.style.transition = '';
    }, 3000);
  }
  
  // Buscar ao digitar
  inputBusca.addEventListener('input', mostrarSugestoes);
  
  // Buscar ao clicar no botão
  btnBusca.addEventListener('click', () => {
    const produtos = coletarProdutos();
    const produto = produtos.find(p => 
      p.nome.toLowerCase().includes(inputBusca.value.toLowerCase().trim())
    );
    
    if (produto) {
      scrollParaProduto(produto.elemento);
      dropdown.style.display = 'none';
    }
  });
  
  // Buscar ao pressionar Enter
  inputBusca.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const produtos = coletarProdutos();
      const produto = produtos.find(p => 
        p.nome.toLowerCase().includes(inputBusca.value.toLowerCase().trim())
      );
      
      if (produto) {
        scrollParaProduto(produto.elemento);
        dropdown.style.display = 'none';
      }
    }
  });
  
  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (!barraBox.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
});