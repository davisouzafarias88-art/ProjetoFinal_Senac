// Carregar dados do usuário logado
const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

if (!usuario) {
    alert('Você precisa estar logado para finalizar a compra!');
    window.location.href = '../autenticacao/login.html';
}

// Preencher dados pessoais automaticamente
function preencherDadosUsuario() {
    console.log('Função preencherDadosUsuario chamada');
    console.log('Usuario do localStorage:', usuario);
    
    if (usuario) {
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const telefoneInput = document.getElementById('telefone');
        const cpfInput = document.getElementById('cpf');
        
        console.log('Elementos encontrados:', {
            nome: !!nomeInput,
            email: !!emailInput,
            telefone: !!telefoneInput,
            cpf: !!cpfInput
        });
        
        if (nomeInput) nomeInput.value = usuario.nome || '';
        if (emailInput) emailInput.value = usuario.email || '';
        if (telefoneInput) telefoneInput.value = usuario.telefone || '';
        if (cpfInput) cpfInput.value = usuario.cpf || '';
        
        // Preencher dados de endereço se existirem
        const cepInput = document.getElementById('cep');
        const ruaInput = document.getElementById('rua');
        const cidadeInput = document.getElementById('cidade');
        
        console.log('Elementos de endereço:', {
            cep: !!cepInput,
            rua: !!ruaInput,
            cidade: !!cidadeInput
        });
        
        console.log('Dados de endereço do usuário:', {
            cep: usuario.cep,
            endereco: usuario.endereco,
            cidade: usuario.cidade
        });
        
        if (cepInput && usuario.cep) cepInput.value = usuario.cep;
        if (ruaInput && usuario.endereco) ruaInput.value = usuario.endereco;
        if (cidadeInput && usuario.cidade) cidadeInput.value = usuario.cidade;
    } else {
        console.log('Usuário não encontrado no localStorage');
    }
}

// Carregar endereços do usuário
async function carregarEnderecos() {
    try {
        const response = await fetch(`http://localhost:3002/api/usuarios/${usuario.id}/enderecos`);
        const enderecos = await response.json();
        
        const selectEndereco = document.getElementById('endereco');
        if (selectEndereco) {
            selectEndereco.innerHTML = '<option value="">Selecione um endereço</option>';
            
            enderecos.forEach(endereco => {
                const option = document.createElement('option');
                option.value = endereco.id;
                option.textContent = `${endereco.nome} - ${endereco.rua}, ${endereco.numero} - ${endereco.cidade}`;
                selectEndereco.appendChild(option);
            });
            
            if (enderecos.length === 0) {
                selectEndereco.innerHTML = '<option value="">Nenhum endereço cadastrado</option>';
            }
        }
    } catch (error) {
        console.error('Erro ao carregar endereços:', error);
    }
}

// Calcular total do carrinho
function calcularTotal() {
    return carrinho.reduce((total, item) => {
        const preco = typeof item.preco === 'string' ? parseFloat(item.preco) : item.preco;
        const quantidade = parseInt(item.quantidade) || 1;
        return total + (preco * quantidade);
    }, 0);
}

// Exibir resumo do pedido
function exibirResumo() {
    const resumoContainer = document.getElementById('resumo-pedido');
    const subtotalElement = document.getElementById('subtotal');
    const totalFinalElement = document.getElementById('total-final');
    
    if (resumoContainer) {
        const subtotal = calcularTotal();
        const frete = 15.90;
        const totalFinal = subtotal + frete;
        
        let html = '';
        carrinho.forEach(item => {
            html += `
                <div class="item-resumo">
                    <span>${item.nome}</span>
                    <span>Qtd: ${item.quantidade}</span>
                    <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                </div>
            `;
        });
        
        resumoContainer.innerHTML = html;
        
        // Atualizar subtotal e total
        if (subtotalElement) subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        if (totalFinalElement) totalFinalElement.textContent = `R$ ${totalFinal.toFixed(2)}`;
    }
}

// Finalizar pedido
async function finalizarPedido() {
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked');
    
    if (!formaPagamento) {
        alert('Selecione uma forma de pagamento!');
        return;
    }
    
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Simular finalização da compra
    try {
        // Simular delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert(`Pedido realizado com sucesso!\nTotal: R$ ${(calcularTotal() + 15.90).toFixed(2)}\nForma de pagamento: ${formaPagamento.value}`);
        
        // Limpar carrinho
        localStorage.removeItem('carrinho');
        
        // Redirecionar para página de sucesso ou conta
        window.location.href = '../index.html';
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao finalizar pedido. Tente novamente.');
    }
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    preencherDadosUsuario();
    carregarEnderecos();
    exibirResumo();
    
    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarPedido);
    }
});