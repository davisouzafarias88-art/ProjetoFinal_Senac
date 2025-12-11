// Dados dos produtos
const produtos = {
    // Produtos em pagina principal
    'Mouse Gamer RGB': {
        nome: 'Mouse Gamer RGB',
        preco: '149.90',
        imagem: '/img/mouse.png',
        descricao: 'Mouse gamer de alta precisão com iluminação RGB personalizável. Sensor óptico de 12.000 DPI, 7 botões programáveis e design ergonômico para longas sessões de jogo. Compatível com Windows, Mac e Linux.'
    },
    'Teclado Mecânico': {
        nome: 'Teclado Mecânico',
        preco: '279.90',
        imagem: '../img/teclado.png',
        descricao: 'Teclado mecânico com switches Cherry MX Blue, retroiluminação RGB e teclas anti-ghosting. Layout ABNT2, cabo USB destacável e construção em alumínio para máxima durabilidade.'
    },
    'Monitor 24" Full HD': {
        nome: 'Monitor 24" Full HD',
        preco: '799.90',
        imagem: '../img/monitor (2).png',
        descricao: 'Monitor LED de 24 polegadas com resolução Full HD 1920x1080. Taxa de atualização de 75Hz, tempo de resposta de 1ms e tecnologia FreeSync para jogos fluidos.'
    },
    'Headset Gamer 7.1': {
        nome: 'Headset Gamer 7.1',
        preco: '189.90',
        imagem: '../img/headset.png',
        descricao: 'Headset gamer com som surround 7.1 virtual, microfone com cancelamento de ruído e almofadas confortáveis. Drivers de 50mm para áudio cristalino e graves profundos.'
    },
    'Webcam HD 1080p': {
        nome: 'Webcam HD 1080p',
        preco: '389.90',
        imagem: '../img/webcam.png',
        descricao: 'Webcam Full HD 1080p com foco automático e microfone integrado. Ideal para videoconferências, streaming e gravação de vídeos com qualidade profissional.'
    },
    'Mousepad RGB Grande': {
        nome: 'Mousepad RGB Grande',
        preco: '79.90',
        imagem: '../img/mousepad.png',
        descricao: 'Mousepad gamer extra grande (800x300mm) com iluminação RGB nas bordas. Base antiderrapante e superfície otimizada para sensores ópticos e laser.'
    },
    'Fone de Ouvido Intra Auricular': {
        nome: 'Fone de Ouvido Intra Auricular',
        preco: '299.90',
        imagem: '../img/Intra.png',
        descricao: 'Fone de ouvido intra-auricular com qualidade de áudio premium. Design ergonômico, isolamento acústico superior e drivers de alta fidelidade para uma experiência sonora excepcional.'
    },
    'Suporte Para Monitor': {
        nome: 'Suporte Para Monitor',
        preco: '129.90',
        imagem: '../img/suporte_monitor.png',
        descricao: 'Suporte articulado para monitor com ajuste de altura, inclinação e rotação 360°. Compatível com monitores de até 27 polegadas e padrão VESA 75x75 e 100x100.'
    },
    'Cartao de Memoria': {
        nome: 'Cartao de Memoria',
        preco: '189.99',
        imagem: '../img/memoria_cartao.png',
        descricao: 'Até 280 MB/s de leitura e 210 MB/s de gravação. Projetado para suas câmeras DSLR ou sem espelho, o cartão Lexar Professional 1800x SDXC UHS-II série GOLD permite capturar e transferir rapidamente fotos de alta qualidade e impressionantes vídeos Full-HD e 4K com velocidades de leitura de até 280 MB/s.'
    },
    // Produtos página de monitores
    'Monitor LG 7.1': {
        nome: 'Monitor LG 7.1',
        preco: '559.99',
        imagem: '/img/Monitor LG.png',
        descricao: 'Monitor LG de alta qualidade com som surround 7.1 integrado. Resolução Full HD, cores vibrantes e design elegante para entretenimento e trabalho.'
    },
    'Monitor Gamer ASUS': {
        nome: 'Monitor Gamer ASUS',
        preco: '999.99',
        imagem: '/img/Monitor ASUS.png',
        descricao: 'Monitor gamer ASUS com taxa de atualização de 144Hz, tempo de resposta de 1ms e tecnologia G-Sync. Perfeito para jogos competitivos com desempenho superior.'
    },
    'Monitor ThinkVision': {
        nome: 'Monitor ThinkVision',
        preco: '467.49',
        imagem: '/img/Monitor ThinkVision.png',
        descricao: 'Monitor profissional ThinkVision com cores precisas e design compacto. Ideal para trabalho em escritório e edição de conteúdo com fidelidade de cores.'
    },
    'Monitor Gamer AOC': {
        nome: 'Monitor Gamer AOC',
        preco: '999.99',
        imagem: '/img/Monitor AOC.png',
        descricao: 'Monitor gamer AOC com resolução 2K, 144Hz e tempo de resposta ultra rápido. Tecnologia FreeSync para experiência de jogo suave e imersiva.'
    },
    'Monitor Gamer Samsung': {
        nome: 'Monitor Gamer Samsung',
        preco: '549.99',
        imagem: '/img/Monitor Sansung.png',
        descricao: 'Monitor gamer Samsung com painel curvo, 144Hz e cores vibrantes. Design ergonômico e suporte ajustável para conforto durante longas sessões.'
    },
    'Monitor Profissional LG': {
        nome: 'Monitor Profissional LG',
        preco: '1399.99',
        imagem: '/img/Monitor Profissional LG.png',
        descricao: 'Monitor profissional LG 4K com calibração de cores de fábrica. Ideal para fotógrafos, designers e profissionais que exigem precisão de cores absoluta.'
    },
    // Produtos de teclado
    'ATTACK SHARK x AJAZZ': {
        nome: 'ATTACK SHARK x AJAZZ',
        preco: '249.90',
        imagem: '/img/Teclado Mecânico RGB.png',
        descricao: 'Teclado mecânico para jogos com fio, com vedação e controle de botão CNC, layout ANSI 75%.'
    },
    'Teclado Gamer Mecânico Rgb': {
        nome: 'Teclado Gamer Mecânico Rgb',
        preco: '199.90',
        imagem: '/img/Teclado Mecânico Switch Blue.png',
        descricao: 'Switch Blue Antighosting Usb 24 Efeitos Teclas Removíveis.'
    },
    'Teclado Gamer com LED': {
        nome: 'Teclado Gamer com LED',
        preco: '149.90',
        imagem: '/img/Teclado Gamer com LED.png',
        descricao: 'Teclado gamer com iluminação LED azul, teclas anti-ghosting e design resistente a respingos. Perfeito para longas sessões de jogo.'
    },
    'Teclado Sem Fio': {
        nome: 'Teclado Sem Fio',
        preco: '129.90',
        imagem: '/img/Teclado Sem Fio.png',
        descricao: 'Teclado wireless com conexão 2.4GHz, bateria de longa duração e design compacto. Ideal para escritório e uso doméstico.'
    },
    'Teclado Mecânico Gamer Magnético Akko x Monsgeek': {
        nome: 'Teclado Mecânico Gamer Magnético Akko x Monsgeek',
        preco: '299.90',
        imagem: '/img/Teclado 60.png',
        descricao: 'Fun60 Pro SP Preto 8k Switch Akko Glare Linear AKKO01-00005-BLK.'
    },
    'Teclado de Escritório': {
        nome: 'Teclado de Escritório',
        preco: '179.90',
        imagem: '/img/Teclado de Escritorio.png',
        descricao: 'Teclado mecânico low profile com switches de baixo perfil, digitação silenciosa e design elegante para uso profissional.'
    },
    // Produtos de mouse
     // Produtos específicos da página de mouse
    'Mouse Gamer Redragon CENTROPHORUS': {
        nome: 'Mouse Gamer Redragon CENTROPHORUS',
        preco: '89.90',
        imagem: '/img/Mouse Gamer RGB.png',
        descricao: 'Mouse ergonômico vertical para reduzir tensão no punho. Design anatômico, sensor de 1600 DPI e 6 botões programáveis para máximo conforto.'
    },

    'Mouse Ergonômico': {
        nome: 'Mouse Ergonômico',
        preco: '79.90',
        imagem: '/img/Mouse Ergonomico.png',
        descricao: 'Mouse ergonômico vertical para reduzir tensão no punho. Design anatômico, sensor de 1600 DPI e 6 botões programáveis para máximo conforto.'
    },
    'Mouse Gamer Sem Fio Logitech G PRO X Superlight': {
        nome: 'Mouse Gamer Sem Fio Logitech G PRO X Superlight',
        preco: '490.90',
        imagem: '/img/Logitech Superlight.png',
        descricao: 'Apresentando o PRO X SUPERLIGHT - o mouse PRO mais leve e rápido de todos os tempos da Logitech. Com tecnologia LIGHTSPEED, foi desenvolvido para ajudá-lo a remover todos os obstáculos, para que você possa se concentrar exclusivamente em vencer.'
    },
    'Mouse Attack Shark X3': {
        nome: 'Mouse Attack Shark X3',
        preco: '110.90',
        imagem: '/img/Mouse Attack Shark X3.png',
        descricao: 'Mouse Gamer Attack Shark X3 ultra leve Pixel Art PAW 3395 Tri mode 26,000 Dpi Wireless'
    },
    'Mouse Redragon Cobra Pro': {
        nome: 'Mouse Redragon Cobra Pro',
        preco: '149.90',
        imagem: '/img/Mouse Redragon Cobra.png',
        descricao: 'Mouse Gamer Redragon Cobra Pro RGB, Wireless, Sem Fio, 16000DPI, 8 Botões Programáveis, USB 2.4G - M711 Pro gamer profissional com sensor de 16.000 DPI, 11 botões programáveis e peso ajustável. RGB personalizável e switches com 50 milhões de cliques.'
    },
    'Mouse de Escritorio': {
        nome: 'Mouse de Escritorio',
        preco: '39.90',
        imagem: '/img/Mouse de Escritorio.png',
        descricao: 'Mouse Óptico Com Fio USB Logitech M90 910-004053 | Preto.'
    },




    // Produtos de headset
    'Headset Gamer Redragon Zeus Lite': {
        nome: 'Headset Gamer Redragon Zeus Lite',
        preco: '154.99',
        imagem: '/img/Headset Gamer Redragon.png',
        descricao: 'Headset gamer Redragon Zeus Lite com som surround 7.1, microfone com cancelamento de ruído e design ergonômico. Perfeito para jogos competitivos.'
    },
    'Headset Gamer Havit 2015d': {
        nome: 'Headset Gamer Havit 2015d',
        preco: '149.99',
        imagem: '/img/Headset Gamer Havit.png',
        descricao: 'Headset gamer Havit 2015d com drivers de alta qualidade, microfone flexível e almofadas confortáveis para longas sessões.'
    },
    'Headset Gamer Havit H2230d': {
        nome: 'Headset Gamer Havit H2230d',
        preco: '109.99',
        imagem: '/img/Headset Gamer Havit H2230d.png',
        descricao: 'Headset gamer Havit H2230d com som estéreo de qualidade, design compacto e microfone integrado. Ideal para jogadores casuais.'
    },
    'Headset Gamer Solid Gear Titanium': {
        nome: 'Headset Gamer Solid Gear Titanium',
        preco: '105.99',
        imagem: '/img/Headset Gamer Solid.png',
        descricao: 'Headset gamer Solid Gear Titanium com construção resistente, som claro e microfone com cancelamento de ruído. Excelente custo-benefício.'
    },
    'Headset Sem Fio Logitech': {
        nome: 'Headset Sem Fio Logitech',
        preco: '398.99',
        imagem: '/img/Headset Sem Fio Logitech.png',
        descricao: 'Headset sem fio Logitech com conexão Bluetooth, bateria de longa duração e som de alta qualidade. Ideal para trabalho e entretenimento.'
    },
    'Headset Sem Fio Logitech Zone Vibe': {
        nome: 'Headset Sem Fio Logitech Zone Vibe',
        preco: '398.99',
        imagem: '/img/Headset Sem Fio Logitech Zone Vibe 100.png',
        descricao: 'Headset profissional Logitech Zone Vibe com som premium, microfone com IA e design confortável para videoconferências.'
    },
    // Produtos de acessórios
    'Lightbar': {
        nome: 'Lightbar',
        preco: '129.90',
        imagem: '/img/Lightbar.png',
        descricao: 'Luminária Barra De Led Para Monitor Notebook Computador Usb Mesa Sensor touch 5 Modeos de Cor, Com Ajuste de intensidade de luz Em Alumínio e Metal USB-A/Type-C.'
    },
    'Fita de Led RGB': {
        nome: 'Fita de Led RGB',
        preco: '49.90',
        imagem: '/img/fita de Led.png',
        descricao: 'Fita de LED RGB com controle remoto, ideal para decoração e iluminação ambiente de setups gamer ou escritórios. Oferece diversas cores e modos de iluminação vibrantes.'
    },
    'Mesa Digitalizadora Wacom': {
        nome: 'Mesa Digitalizadora Wacom',
        preco: '199.90',
        imagem: '/img/mesa digitalizadora.png',
        descricao: 'Mesa digitalizadora da Wacom profissional com alta sensibilidade à pressão e grande área ativa. Perfeita para desenho digital, ilustração, edição de fotos e anotações.'
    },
    'Switch V3 Pro Silver ': {
        nome: 'Switch V3 Pro Silver ',
        preco: '149.90',
        imagem: '/img/switches.png',
        descricao: 'Switch V3 Pro Silver mecânico com resposta tátil suave e durabilidade superior. Ideal para teclados personalizados e entusiastas de digitação.'
    },
    'Pendrive Sandisk': {
        nome: 'Pendrive Sandisk',
        preco: '69.90',
        imagem: '/img/pendrive.png',
        descricao: 'Pen drive Sandisk com alta velocidade de transferência e capacidade de armazenamento confiável. Compacto e portátil, ideal para transportar arquivos importantes.'
    },
    'Microfone Gamer Rise Mode': {
        nome: 'Microfone Gamer Rise Mode',
        preco: '89.90',
        imagem: '/img/microfone.png',
        descricao: 'Microfone gamer Rise Mode com qualidade de estúdio, ideal para streaming, podcasts e gravação de voz. Oferece captação clara e redução de ruído ambiente.   '
    },
    // Produtos em oferta
    'Mouse Gamer RGB Redragon CENTROPHORUS - OFERTA': {
        nome: 'Mouse Gamer RGB Redragon CENTROPHORUS - OFERTA',
        preco: '69.99',
        imagem: '../img/Mouse Gamer RGB.png',
        descricao: 'Mouse gamer Redragon CENTROPHORUS com sensor de 12.000 DPI, 7 botões programáveis e iluminação personalizável. Oferta por tempo limitado.'
    },
    'Teclado Mecânico Switch Blue - OFERTA': {
        nome: 'Teclado Mecânico Switch Blue - OFERTA',
        preco: '149.99',
        imagem: '../img/Teclado Mecânico Switch Blue.png',
        descricao: 'Teclado mecânico Switch Blue com switches Cherry MX, RGB e layout ABNT2. Oferta por tempo limitado.'
    },
    'Headset Gamer Havit 2015d - OFERTA': {
        nome: 'Headset Gamer Havit 2015d - OFERTA',
        preco: '99.99',
        imagem: '../img/Headset Gamer Havit.png',
        descricao: 'Headset gamer Havit 2015d com som surround 7.1, microfone com cancelamento de ruído. Oferta por tempo limitado.'
    },
    'Webcam HD - OFERTA': {
        nome: 'Webcam HD - OFERTA',
        preco: '279.99',
        imagem: '../img/webcam.png',
        descricao: 'Webcam Full HD 1080p com foco automático, microfone integrado e qualidade profissional. Oferta por tempo limitado.'
    },
    'Mousepad RGB - OFERTA': {
        nome: 'Mousepad RGB - OFERTA',
        preco: '49.99',
        imagem: '../img/mousepad.png',
        descricao: 'Mousepad RGB grande com iluminação nas bordas, base antiderrapante e superfície otimizada. Oferta por tempo limitado.'
    },
    'Monitor Gamer AOC - OFERTA': {
        nome: 'Monitor Gamer AOC - OFERTA',
        preco: '799.99',
        imagem: '../img/Monitor AOC.png',
        descricao: 'Monitor gamer AOC com resolução 2K, 144Hz e tempo de resposta ultra rápido. Oferta por tempo limitado.'
    },
};

// Função para carregar produto da URL
function carregarProduto() {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const nomeProduto = parametrosUrl.get('produto');
    
    if (nomeProduto && produtos[nomeProduto]) {
        const produto = produtos[nomeProduto];
        
        // Atualizar elementos da página
        document.getElementById('produto-titulo').textContent = `${produto.nome} - TechMoon`;
        document.getElementById('produto-nome').textContent = produto.nome;
        document.getElementById('produto-preco').textContent = produto.preco;
        atualizarParcelas(produto.preco);
        document.getElementById('produto-img').src = produto.imagem;
        document.getElementById('produto-img').alt = produto.nome;
        document.getElementById('produto-desc').textContent = produto.descricao;

        
        // Configurar miniaturas
        const miniaturas = document.querySelectorAll('.miniatura');
        const imagemPrincipal = document.getElementById('produto-img');
        
        // Imagens alternativas (usando a mesma imagem com variações)
        const imagens = [
            produto.imagem,
            produto.imagem,
            produto.imagem,
            produto.imagem,
            produto.imagem
        ];
        
        miniaturas.forEach((miniatura, index) => {
            miniatura.src = imagens[index];
            miniatura.addEventListener('click', function() {
                imagemPrincipal.src = imagens[index];
                miniaturas.forEach(m => m.classList.remove('ativa'));
                this.classList.add('ativa');
            });
        });
        
        // Configurar botão de adicionar ao carrinho
        const botaoAdicionar = document.getElementById('botao-adicionar');
        botaoAdicionar.addEventListener('click', function() {
            const quantidade = document.getElementById('quantidade').value;
            adicionarAoCarrinho(produto, quantidade);
        });
    } else {
        // Produto não encontrado, redirecionar para página inicial
        window.location.href = 'layout.html';
    }
}

// Função para normalizar caminho da imagem
function normalizarCaminho(caminho) {
    if (!caminho) return '/img/placeholder.png';
    if (caminho.includes('placeholder')) return caminho;
    if (caminho.startsWith('http')) return caminho;
    if (caminho.startsWith('/')) return caminho;
    if (caminho.startsWith('../img/')) return caminho.replace('../img/', '/img/');
    if (caminho.startsWith('img/')) return '/' + caminho;
    return '/img/' + caminho;
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const qtd = parseInt(quantidade) || 1;
    const imagemNormalizada = normalizarCaminho(produto.imagem);
    
    const itemExistente = carrinho.find(item => item.nome === produto.nome);
    
    if (itemExistente) {
        itemExistente.quantidade += qtd;
    } else {
        carrinho.push({
            nome: produto.nome,
            preco: parseFloat(produto.preco),
            imagem: imagemNormalizada,
            quantidade: qtd
        });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Feedback visual
    const botao = document.getElementById('botao-adicionar');
    const textoOriginal = botao.textContent;
    botao.textContent = 'Adicionado!';
    botao.classList.add('produto-adicionado');
    
    setTimeout(() => {
        botao.textContent = textoOriginal;
        botao.classList.remove('produto-adicionado');
    }, 2000);
}

// Carregar produto quando a página carregar
document.addEventListener('DOMContentLoaded', carregarProduto);

function atualizarParcelas(preco) {
    const container = document.getElementById("lista-parcelas");
    container.innerHTML = ""; // limpar antes de recriar tudo

    const precoNum = parseFloat(preco);

    for (let i = 1; i <= 5; i++) {
        let parcelaSemJuros = precoNum / i;

        const div = document.createElement("div");
        div.classList.add("parcela");

        if (i === 1) div.classList.add("destaque");

        div.innerHTML = `
            ${i}x de R$ ${parcelaSemJuros.toFixed(2).replace(".", ",")} 
            <span>(sem juros)</span>
        `;

        container.appendChild(div);
    }
}
