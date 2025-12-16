// back/api/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conexao = require('../bd/conexao'); // importa a conexão

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json());

// importa as rotas
const routes = require('./routes');
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
