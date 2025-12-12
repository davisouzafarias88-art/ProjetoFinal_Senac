const filtroStatus = document.getElementById('filtro-status'); // O menu de Status (select)
const filtroData = document.getElementById('filtro-data'); // O campo de Data
const pedidoCards = document.querySelectorAll('.pedido-card'); // Todos os cartões de pedidos

// Função Mestra: É ela quem faz o trabalho de filtrar
function aplicarFiltros() {
    // Pega o valor que o usuário selecionou no menu de status (ex: 'enviado')
    const statusDesejado = filtroStatus.value;
    
    // Pega a data que o usuário escolheu (no formato YYYY-MM-DD, ou vazio)
    const dataDesejada = filtroData.value;

    // Passa por cada cartão de pedido (um de cada vez)
    pedidoCards.forEach(card => {
        const statusBadge = card.querySelector('.status-badge');
        
        // 1. Prepara a Data do Pedido para Comparação
        // Pega a data do HTML (ex: "15/10/2025")
        const dataElemento = card.querySelector('.data').textContent.trim(); 
        const [dia, mes, ano] = dataElemento.split('/'); 
        // split é uma função que divide uma string em um array de substrings

        // Converte para o formato universal 'YYYY-MM-DD' para comparar com o campo de input
        const dataPedidoISO = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
        
        
        // --- Checagem de Status (A mais confiável!) ---
        
        let passaNoStatus = false;
        
        if (statusDesejado === 'todos') {
            // Se o usuário quer TUDO, ele passa no filtro de status
            passaNoStatus = true;
        } else {
            // Monta a classe CSS que esperamos no cartão (ex: 'status-enviado')
            const classeStatusTarget = `status-${statusDesejado}`;
            
            // Checa se a badge do cartão TEM essa classe
            passaNoStatus = statusBadge.classList.contains(classeStatusTarget);
        }

        
        // --- Checagem de Data ---

        let passaNaData = false;
        
        if (!dataDesejada) {
            // Se o campo de data está vazio, ele passa no filtro de data.
            passaNaData = true;
        } else {
            // Verifica se a data do pedido é IGUAL ou POSTERIOR à data escolhida no filtro.
            // Para mostrar APENAS a data exata, mude para: dataPedidoISO === dataDesejada
            passaNaData = dataPedidoISO >= dataDesejada;
        }

        
        // --- Resultado Final ---
        
        // O cartão SÓ aparece se passar NO STATUS **E** NA DATA!
        if (passaNoStatus && passaNaData) {
            card.style.display = 'block'; // Mostra o cartão
        } else {
            card.style.display = 'none'; // Esconde o cartão
        }
    });
}

// Escuta quando o usuário muda o Status e chama a função de filtro
filtroStatus.addEventListener('change', aplicarFiltros);

// Escuta quando o usuário escolhe uma Data e chama a função de filtro
filtroData.addEventListener('change', aplicarFiltros);
