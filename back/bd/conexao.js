// back/bd/conexao.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' }); // carrega as variáveis do .env

const conexao = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// tenta conectar
conexao.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
  } else {
    console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');
  }
});

module.exports = conexao;
