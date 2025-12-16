
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    genero ENUM('M', 'F', 'Outro'),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    telefone VARCHAR(20),
    principal BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    categoria_id INT,
    imagem VARCHAR(255),
    descricao TEXT,
    estoque INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE formas_pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo ENUM('credito','debito','pix','boleto') NOT NULL,
    numero_cartao VARCHAR(20),
    nome_titular VARCHAR(100),
    validade VARCHAR(5),
    principal BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    endereco_id INT NOT NULL,
    forma_pagamento_id INT NOT NULL,
    status ENUM('pendente','pago','enviado','entregue','cancelado') DEFAULT 'pendente',
    total DECIMAL(10,2) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    codigo_rastreamento VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (endereco_id) REFERENCES enderecos(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES formas_pagamento(id)
);

CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT DEFAULT 1,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE ofertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL UNIQUE,
    preco_original DECIMAL(10,2) NOT NULL,
    preco_promocional DECIMAL(10,2) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);

INSERT INTO categorias (nome, descricao) VALUES
('Teclados', 'Teclados mecânicos e de membrana'),
('Mouses', 'Mouses gamer e profissionais'),
('Headsets', 'Fones de ouvido e headsets'),
('Monitores', 'Monitores para gaming e trabalho'),
('Acessórios', 'Acessórios para setup');

INSERT INTO produtos (nome, preco, categoria_id, imagem, descricao, estoque) VALUES
('Teclado Mecânico RGB', 299.90, 1, 'teclado1.jpg', 'Teclado mecânico com RGB', 50),
('Mouse Gamer 12000 DPI', 199.90, 2, 'mouse1.jpg', 'Mouse gamer alta precisão', 40),
('Headset 7.1 Surround', 249.90, 3, 'headset1.jpg', 'Headset com som surround', 30),
('Monitor 24" 144Hz', 899.90, 4, 'monitor1.jpg', 'Monitor gamer 144Hz', 15),
('Mousepad XXL', 79.90, 5, 'mousepad1.jpg', 'Mousepad gamer grande', 100);


