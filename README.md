# 🌙 TechMoon - E-commerce de Periféricos

Projeto final do curso desenvolvido para uma loja virtual especializada em periféricos de tecnologia (teclados, mouses, headsets e acessórios).

## 📋 Sobre o Projeto

O **TechMoon** é um e-commerce completo que oferece uma experiência de compra intuitiva para produtos de tecnologia. O projeto foi desenvolvido utilizando HTML5, CSS3 e JavaScript, focando em design responsivo e usabilidade.

### 🎯 Objetivos
- Criar uma interface moderna e atrativa
- Implementar sistema de autenticação de usuários
- Desenvolver carrinho de compras funcional
- Proporcionar experiência responsiva em diferentes dispositivos

## 🚀 Funcionalidades

### ✅ Implementadas
- **Catálogo de Produtos**: Navegação por categorias (Teclados, Mouses, Headsets, Acessórios)
- **Sistema de Autenticação**: Páginas de login e cadastro
- **Carrinho de Compras**: Adição e remoção de produtos
- **Página de Produto**: Detalhes, imagens e opções de pagamento
- **Área do Cliente**: Gerenciamento de dados pessoais, endereços e pedidos
- **Design Responsivo**: Adaptável para desktop e mobile

### 🔄 Em Desenvolvimento
- Validação de formulários com JavaScript
- Persistência de dados no localStorage
- Sistema de busca funcional
- Animações e transições

## 📁 Estrutura de Arquivos

```
#Projetofinal/
├── css/
│   ├── config_conta.css/
│   │   ├── dados.css
│   │   ├── endereco.css
│   │   ├── logout.css
│   │   ├── pagamento.css
│   │   └── pedidos.css
│   ├── nav/
│   │   ├── carrinho.css
│   │   ├── conta.css
│   │   ├── pag.pagamento.css
│   │   └── Pagina de Login.css
│   ├── nav2/
│   │   ├── acessorio.css
│   │   ├── headset.css
│   │   ├── mouse.css
│   │   ├── ofertas.css
│   │   └── teclado.css
│   ├── Cadastro.css
│   ├── layout.css
│   ├── Pagina de Login.css
│   ├── produto.css
│   └── Senha_cadastro.css
├── html/
│   ├── config_conta.html/
│   │   ├── dados.html
│   │   ├── endereco.html
│   │   ├── formas_de_pagamento.html
│   │   ├── logout.html
│   │   └── pedidos.html
│   ├── nav/
│   │   ├── Cadastro.html
│   │   ├── carrinho.html
│   │   ├── conta.html
│   │   ├── login.html
│   │   ├── pag.pagamento.html
│   │   ├── Pagina de Login.html
│   │   └── Senha_cadastro.html
│   ├── nav2.html/
│   │   ├── acessorio.html
│   │   ├── headset.html
│   │   ├── mouse.html
│   │   ├── ofertas.html
│   │   └── teclado.html
│   ├── layout.html
│   └── produto.html
├── img/
│   ├── Fundo_cadastro.png
│   ├── Fundo_pagina_login.png
│   ├── Fundo_senhacadastro.png
│   ├── icon_*.png (ícones diversos)
│   ├── logo.jpeg
│   └── produtos/ (imagens de produtos)
├── js/
│   ├── carrinho.js       # Funcionalidades do carrinho de compras
│   ├── layout.js         # Interações da página principal
│   ├── produto.js        # Galeria e detalhes do produto
│   ├── login.js          # Validação e autenticação
│   └── cadastro.js       # Validação do formulário de cadastro
    
└── README.md
```

## 💻 Arquivos JavaScript

### **carrinho.js**
- Adição e remoção de produtos
- Cálculo de totais e subtotais
- Persistência no localStorage
- Atualização dinâmica da interface

### **layout.js**
- Menu responsivo mobile
- Sistema de busca
- Navegação entre páginas
- Carregamento dinâmico de conteúdo

### **produto.js**
- Galeria de imagens interativa
- Seleção de quantidade
- Cálculo de parcelamento
- Integração com carrinho

### **login.js**
- Validação de formulários
- Autenticação de usuários
- Gerenciamento de sessão
- Redirecionamento pós-login

### **cadastro.js**
- Validação de CPF e email
- Formatação de campos
- Verificação de senhas
- Armazenamento de dados

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estruturação semântica das páginas
- **CSS3**: Estilização e design responsivo
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Font Awesome**: Ícones e elementos visuais
- **Git**: Controle de versão

## 💻 Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (opcional, para visualizar o código)

### Passos para Execução

1. **Clone ou baixe o repositório**
   ```bash
   git clone https://github.com/davisouzafarias88-art/ProjetoFinal_Senac.git
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd ProjetoFinal_Senac
   ```

3. **Abra o arquivo principal**
   - Localize o arquivo `html/layout.html`
   - Clique duas vezes para abrir no navegador
   - Ou clique com botão direito → "Abrir com" → Seu navegador preferido

4. **Navegação no Site**
   - **Página Inicial**: `html/layout.html`
   - **Login**: `html/nav/login.html`
   - **Cadastro**: `html/nav/Cadastro.html`
   - **Produtos**: Navegue pelas categorias no menu
   - **Carrinho**: Ícone do carrinho no header

### 🔗 Estrutura de Navegação
```
Página Inicial (layout.html)
├── Categorias
│   ├── Teclados
│   ├── Mouses
│   ├── Headsets
│   └── Acessórios
├── Autenticação
│   ├── Login
│   └── Cadastro
├── Carrinho de Compras
└── Área do Cliente
    ├── Meus Dados
    ├── Endereços
    ├── Pedidos
    └── Formas de Pagamento
```

## 👥 Equipe de Desenvolvimento

- **Desenvolvedor Principal**: Samuel
- **Colaborador**: Davi Souza Farias
- **Instituição**: SENAC DF

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como projeto final de curso.


**TechMoon** - Sua loja especializada em tecnologia e periféricos de alta qualidade.

*Desenvolvido com 💙 pela equipe SENAC DF*