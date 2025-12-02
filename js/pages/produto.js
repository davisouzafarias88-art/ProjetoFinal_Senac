// Dados dos produtos
const produtos = {
    'Mouse Gamer RGB': {
        nome: 'Mouse Gamer RGB',
        preco: '149.90',
        imagem: '../img/mouse.png',
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
    // Produtos específicos da página de mouse
    'Mouse Ergonômico': {
        nome: 'Mouse Ergonômico',
        preco: '79.90',
        imagem: '/img/mouse.png',
        descricao: 'Mouse ergonômico vertical para reduzir tensão no punho. Design anatômico, sensor de 1600 DPI e 6 botões programáveis para máximo conforto.'
    },
    'Mouse Sem Fio': {
        nome: 'Mouse Sem Fio',
        preco: '59.90',
        imagem: '/img/mouse.png',
        descricao: 'Mouse wireless com conexão 2.4GHz, alcance de até 10 metros. Bateria de longa duração, sensor óptico de 1200 DPI e design compacto.'
    },
    'Mouse Vertical': {
        nome: 'Mouse Vertical',
        preco: '99.90',
        imagem: '/img/mouse.png',
        descricao: 'Mouse vertical ergonômico para posição natural da mão. Reduz fadiga e tensão, sensor de 2400 DPI e 5 botões programáveis.'
    },
    'Mouse Pro Gamer': {
        nome: 'Mouse Pro Gamer',
        preco: '149.90',
        imagem: '/img/mouse.png',
        descricao: 'Mouse gamer profissional com sensor de 16.000 DPI, 11 botões programáveis e peso ajustável. RGB personalizável e switches com 50 milhões de cliques.'
    },
    'Mouse Compacto': {
        nome: 'Mouse Compacto',
        preco: '39.90',
        imagem: '/img/mouse.png',
        descricao: 'Mouse compacto ideal para notebooks e viagens. Design minimalista, sensor óptico de 1000 DPI e conexão USB plug-and-play.'
    },
    // Produtos de teclado
    'Teclado Mecânico RGB': {
        nome: 'Teclado Mecânico RGB',
        preco: '249.90',
        imagem: '/img/teclado.png',
        descricao: 'Teclado mecânico RGB com switches Cherry MX, retroiluminação personalizável e teclas anti-ghosting. Layout ABNT2 e construção premium.'
    },
    'Teclado Mecânico Switch Blue': {
        nome: 'Teclado Mecânico Switch Blue',
        preco: '199.90',
        imagem: '/img/teclado.png',
        descricao: 'Teclado mecânico com switches Cherry MX Blue para feedback tátil e sonoro. Ideal para digitação e jogos casuais.'
    },
    'Teclado Gamer com LED': {
        nome: 'Teclado Gamer com LED',
        preco: '149.90',
        imagem: '/img/teclado.png',
        descricao: 'Teclado gamer com iluminação LED azul, teclas anti-ghosting e design resistente a respingos. Perfeito para longas sessões de jogo.'
    },
    'Teclado Sem Fio': {
        nome: 'Teclado Sem Fio',
        preco: '129.90',
        imagem: '/img/teclado.png',
        descricao: 'Teclado wireless com conexão 2.4GHz, bateria de longa duração e design compacto. Ideal para escritório e uso doméstico.'
    },
    'Teclado Compacto 60%': {
        nome: 'Teclado Compacto 60%',
        preco: '299.90',
        imagem: '/img/teclado.png',
        descricao: 'Teclado mecânico compacto 60% com switches hot-swap, RGB por tecla e case de alumínio. Para entusiastas e profissionais.'
    },
    'Teclado Low Profile': {
        nome: 'Teclado Low Profile',
        preco: '179.90',
        imagem: '/img/teclado.png',
        descricao: 'Teclado mecânico low profile com switches de baixo perfil, digitação silenciosa e design elegante para uso profissional.'
    },
    // Produtos de headset
    'Headset Sem Fio': {
        nome: 'Headset Sem Fio',
        preco: '299.90',
        imagem: '/img/headset.png',
        descricao: 'Headset wireless com som surround, bateria de 20 horas e microfone com cancelamento de ruído. Conexão Bluetooth e 2.4GHz.'
    },
    'Headset Profissional': {
        nome: 'Headset Profissional',
        preco: '399.90',
        imagem: '/img/headset.png',
        descricao: 'Headset profissional com drivers de 50mm, isolamento acústico superior e microfone broadcast. Ideal para streaming e trabalho.'
    },
    'Headset RGB': {
        nome: 'Headset RGB',
        preco: '229.90',
        imagem: '/img/headset.png',
        descricao: 'Headset gamer com iluminação RGB sincronizada, som surround 7.1 e design ergonômico para longas sessões de jogo.'
    },
    'Headset Compacto': {
        nome: 'Headset Compacto',
        preco: '129.90',
        imagem: '/img/headset.png',
        descricao: 'Headset compacto e leve com áudio estéreo de qualidade, microfone flexível e almofadas confortáveis.'
    },
    'Headset Premium': {
        nome: 'Headset Premium',
        preco: '599.90',
        imagem: '/img/headset.png',
        descricao: 'Headset premium com drivers planares magnéticos, construção em alumínio e áudio Hi-Fi para audiófilos.'
    },
// Produtos de acessórios
'Lightbar': {
    nome: 'Lightbar',
    preco: '89.90',
    imagem: '/img/Lightbar.png',
    descricao: 'Luminária Barra De Led Para Monitor Notebook Computador Usb Mesa Sensor touch 5 Modeos de Cor, Com Ajuste de intensidade de luz Em Alumínio e Metal USB-A/Type-C.'
},

'Fita de Led RGB': {
    nome: 'Fita de Led RGB',
    preco: '49.90',
    imagem: '/img/fita de Led.png',
    descricao: 'Fita de LED RGB com controle remoto, ideal para decoração e iluminação ambiente de setups gamer ou escritórios. Oferece diversas cores e modos de iluminação vibrantes.'
},

'Mesa Digitalizadora': {
    nome: 'Mesa Digitalizadora',
    preco: '89.90',
    imagem: '/img/mesa digitalizadora.png',
    descricao: 'Mesa digitalizadora profissional com alta sensibilidade à pressão e grande área ativa. Perfeita para desenho digital, ilustração, edição de fotos e anotações.'
},

'Switch': {
    nome: 'Switch',
    preco: '89.90',
    imagem: '/img/switches.png',
    descricao: 'Switch de rede compacto com portas Fast/Gigabit Ethernet (dependendo do modelo), ideal para expandir a rede doméstica ou do escritório, garantindo conexões estáveis e de alta velocidade.'
},

'pendrive': {
    nome: 'pendrive',
    preco: '69.90',
    imagem: '/img/pendrive.png',
    descricao: 'Pen drive de alta velocidade com capacidade de X GB (especificar a capacidade, ex: 64GB) e interface USB 3.0/3.1. Solução prática para armazenamento e transferência rápida de arquivos.'
},

'Microfone Gamer': {
    nome: 'Microfone Gamer',
    preco: '89.90',
    imagem: '/img/microfone.png',
    descricao: 'Microfone gamer de alta qualidade com captação omnidirecional/cardioide (dependendo do modelo) e conexão USB. Perfeito para streaming, gravação de voz e comunicação clara em jogos.'
},









    // Produtos em oferta
    'Mouse Gamer RGB - OFERTA': {
        nome: 'Mouse Gamer RGB - OFERTA',
        preco: '59.90',
        imagem: '../img/mouse.png',
        descricao: 'Mouse gamer RGB em promoção especial! Sensor de 12.000 DPI, 7 botões programáveis e iluminação personalizável. Oferta por tempo limitado.'
    },
    'Teclado Mecânico - OFERTA': {
        nome: 'Teclado Mecânico - OFERTA',
        preco: '179.90',
        imagem: '../img/mouse2.webp',
        descricao: 'Teclado mecânico em oferta imperdível! Switches Cherry MX, RGB e layout ABNT2. Economia de R$ 70,00!'
    },
    'Headset Gamer - OFERTA': {
        nome: 'Headset Gamer - OFERTA',
        preco: '99.90',
        imagem: 'https://via.placeholder.com/500x400/737373/ffffff?text=Headset+Oferta',
        descricao: 'Headset gamer com desconto especial! Som surround 7.1, microfone com cancelamento de ruído. Promoção limitada!'
    },
    'Webcam HD - OFERTA': {
        nome: 'Webcam HD - OFERTA',
        preco: '79.90',
        imagem: 'https://via.placeholder.com/500x400/737373/ffffff?text=Webcam+Oferta',
        descricao: 'Webcam Full HD 1080p em oferta! Foco automático, microfone integrado e qualidade profissional por um preço incrível.'
    },
    'Mousepad RGB - OFERTA': {
        nome: 'Mousepad RGB - OFERTA',
        preco: '29.90',
        imagem: 'https://via.placeholder.com/500x400/737373/ffffff?text=Mousepad+Oferta',
        descricao: 'Mousepad RGB grande em promoção! Iluminação nas bordas, base antiderrapante e superfície otimizada. Oferta especial!'
    },
    'Kit Gamer Completo - OFERTA': {
        nome: 'Kit Gamer Completo - OFERTA',
        preco: '399.90',
        imagem: 'https://via.placeholder.com/500x400/737373/ffffff?text=Kit+Gamer',
        descricao: 'Kit gamer completo em oferta! Inclui mouse, teclado, headset e mousepad RGB. Economia de R$ 200,00 no combo!'
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

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    const itemExistente = carrinho.find(item => item.nome === produto.nome);
    
    if (itemExistente) {
        itemExistente.quantidade += parseInt(quantidade);
    } else {
        carrinho.push({
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: parseInt(quantidade)
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